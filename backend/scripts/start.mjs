import { runCLI } from "@wp-playground/cli";
import { mkdir, readFile, writeFile, access, copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
import { randomBytes } from "node:crypto";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { Server as NetServer } from "node:net";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const wordpress = resolve(root, "wordpress");
const runtime = resolve(root, ".runtime");
await mkdir(wordpress, { recursive: true });
await mkdir(runtime, { recursive: true });
const exists = async (path) =>
  access(path).then(
    () => true,
    () => false,
  );
const initialized = await exists(resolve(runtime, "installed.json"));
await mkdir(resolve(wordpress, "wp-content/mu-plugins"), { recursive: true });
await copyFile(resolve(root, "mu-plugins/tienda-cordobas.php"), resolve(wordpress, "wp-content/mu-plugins/tienda-cordobas.php"));
// Native extraction avoids Windows rename errors when PHP.wasm installs large plugins.
if (
  process.platform === "win32" &&
  !(await exists(
    resolve(wordpress, "wp-content/plugins/woocommerce/woocommerce.php"),
  ))
) {
  const zip = resolve(runtime, "woocommerce.zip");
  console.log("Descargando WooCommerce oficial…");
  const download = await fetch(
    "https://downloads.wordpress.org/plugin/woocommerce.latest-stable.zip",
    { signal: AbortSignal.timeout(180000) },
  );
  if (!download.ok)
    throw new Error(`Descarga de WooCommerce: HTTP ${download.status}`);
  await writeFile(zip, Buffer.from(await download.arrayBuffer()));
  await promisify(execFile)(
    "powershell.exe",
    [
      "-NoProfile",
      "-NonInteractive",
      "-Command",
      "Expand-Archive -LiteralPath $env:LEANDRO_WOO_ZIP -DestinationPath $env:LEANDRO_WOO_PLUGINS -Force",
    ],
    {
      windowsHide: true,
      env: {
        ...process.env,
        LEANDRO_WOO_ZIP: zip,
        LEANDRO_WOO_PLUGINS: resolve(wordpress, "wp-content/plugins"),
      },
    },
  );
}
const credentialPath = resolve(runtime, "acceso-local.json");
if (!(await exists(credentialPath))) {
  await writeFile(
    credentialPath,
    JSON.stringify(
      {
        username: "admin",
        password: randomBytes(24).toString("base64url"),
        url: "http://127.0.0.1:9400/wp-admin/",
      },
      null,
      2,
    ),
    { mode: 0o600 },
  );
}
const bootstrap = JSON.parse(
  await readFile(resolve(root, "blueprint.json"), "utf8"),
);
// Resume interrupted installations without reinstalling existing plugin files.
bootstrap.plugins = [];
for (const slug of ["sqlite-database-integration", "woocommerce"]) {
  const entry = slug === "woocommerce" ? "woocommerce.php" : "load.php";
  if (await exists(resolve(wordpress, `wp-content/plugins/${slug}/${entry}`))) {
    bootstrap.steps.push({
      step: "activatePlugin",
      pluginPath: `${slug}/${entry}`,
    });
  } else {
    bootstrap.plugins.push(slug);
  }
}
if (!initialized) {
  const uploads = resolve(wordpress, "wp-content/uploads/ejemplos");
  await mkdir(uploads, { recursive: true });
  const images = {
    "paleta.jpg":
      "https://images.unsplash.com/photo-1636734909254-ff5c43927e10?auto=format&fit=crop&w=1000&q=80",
    "pelotas.jpg":
      "https://images.unsplash.com/photo-1633976027967-49db0f2507f6?auto=format&fit=crop&w=1000&q=80",
  };
  for (const [name, url] of Object.entries(images)) {
    if (await exists(resolve(uploads, name))) continue;
    const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
    if (!response.ok)
      throw new Error(
        `No se pudo descargar la fotografía ${name}: ${response.status}`,
      );
    await writeFile(
      resolve(uploads, name),
      Buffer.from(await response.arrayBuffer()),
    );
  }
  const seed = await readFile(resolve(root, "scripts/seed.php"), "utf8");
  bootstrap.steps.push({ step: "runPHP", code: seed });
  bootstrap.steps.push({ step: "setSiteLanguage", language: "es_ES" });
}
console.log(
  initialized
    ? "Abriendo WordPress guardado…"
    : "Instalando WordPress y WooCommerce por primera vez…",
);
// Playground CLI does not currently expose a bind-host option. Its internal
// availability probe and HTTP server must both bind to loopback from the outset.
const originalListen = NetServer.prototype.listen;
NetServer.prototype.listen = function (...args) {
  if (args[0] === 9400 && (args.length === 1 || typeof args[1] === "function")) {
    args.splice(1, 0, "127.0.0.1");
  }
  return originalListen.apply(this, args);
};
const instance = await runCLI({
  command: "server",
  port: 9400,
  "site-url": "http://127.0.0.1:9400",
  php: "8.3",
  workers: 6,
  "mount-before-install": [
    { hostPath: wordpress, vfsPath: "/wordpress" },
    { hostPath: runtime, vfsPath: "/leandro-private" },
  ],
  wordpressInstallMode: (await exists(resolve(wordpress, "wp-config.php")))
    ? "do-not-attempt-installing"
    : "download-and-install",
  blueprint: initialized ? { login: false } : bootstrap,
  login: false,
});
NetServer.prototype.listen = originalListen;
if (!initialized)
  await writeFile(
    resolve(runtime, "installed.json"),
    JSON.stringify(
      { installedAt: new Date().toISOString(), url: instance.serverUrl },
      null,
      2,
    ),
  );
await writeFile(resolve(runtime, "server.pid"), String(process.pid));
console.log("WordPress: http://127.0.0.1:9400/wp-admin/");
console.log(
  "Acceso: consulta backend/.runtime/acceso-local.json. Solo disponible en este equipo.",
);
let closing = false;
async function stop() {
  if (closing) return;
  closing = true;
  await instance[Symbol.asyncDispose]();
  process.exit(0);
}
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
