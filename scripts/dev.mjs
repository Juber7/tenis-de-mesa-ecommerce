import { spawn } from "node:child_process";
import { connect } from "node:net";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const shopUrl = "http://127.0.0.1:3000";

async function responds(url, timeout = 10000) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(timeout) });
    return response.ok;
  } catch {
    return false;
  }
}

function portInUse(port) {
  return new Promise((done) => {
    const socket = connect({ host: "127.0.0.1", port });
    socket.setTimeout(1500);
    socket.once("connect", () => { socket.destroy(); done(true); });
    socket.once("error", () => { socket.destroy(); done(false); });
    socket.once("timeout", () => { socket.destroy(); done(false); });
  });
}

if (await portInUse(3000)) {
  if (!await responds(shopUrl, 15000)) {
    throw new Error("El puerto 3000 está ocupado, pero la tienda no responde.");
  }
  console.log("La tienda ya está iniciada; abre http://127.0.0.1:3000");
} else {
  const frontend = spawn(process.execPath, [
    resolve(root, "frontend/node_modules/next/dist/bin/next"),
    "dev", "--hostname", "127.0.0.1",
  ], {
    cwd: resolve(root, "frontend"),
    stdio: "inherit",
    windowsHide: true,
    // The BCN exchange-rate service omits an intermediate certificate; the
    // operating system's store completes the chain (Node 22.15+/23.8+).
    env: { ...process.env, NODE_USE_SYSTEM_CA: "1" },
  });
  const stop = () => frontend.kill();
  process.on("SIGINT", stop);
  process.on("SIGTERM", stop);
  frontend.on("exit", (code) => { process.exitCode = code || 0; });
  console.log("\nTienda: http://127.0.0.1:3000\nPanel de productos: https://tenis-de-mesa-leandro.sanity.studio\nCtrl+C detiene la tienda.");
}
