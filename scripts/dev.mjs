import { spawn } from "node:child_process";
import { connect } from "node:net";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const wordpressUrl = "http://127.0.0.1:9400/wp-json/wc/store/v1/products?per_page=1";
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

let backend;
let frontend;
let stopping = false;
function stop() {
  if (stopping) return;
  stopping = true;
  frontend?.kill();
  backend?.kill();
}
process.on("SIGINT", stop);
process.on("SIGTERM", stop);

const backendOccupied = await portInUse(9400);
if (!backendOccupied) {
  backend = spawn(process.execPath, [resolve(root, "backend/scripts/start.mjs")], {
    cwd: resolve(root, "backend"), stdio: "inherit", windowsHide: true,
  });
  backend.on("exit", (code) => {
    if (!stopping) { stop(); process.exitCode = code || 1; }
  });
} else {
  console.log("WordPress ya está iniciado; reutilizando el servidor.");
}

const deadline = Date.now() + 300000;
let ready = false;
while (Date.now() < deadline && !stopping) {
  if (await responds(wordpressUrl, 30000)) { ready = true; break; }
  await new Promise((done) => setTimeout(done, 1500));
}
if (!ready) {
  stop();
  throw new Error("WordPress no respondió a tiempo. Revisa el servidor del puerto 9400.");
}

if (await portInUse(3000)) {
  if (!await responds(shopUrl, 15000)) {
    stop();
    throw new Error("El puerto 3000 está ocupado, pero la tienda no responde.");
  }
  console.log("La tienda ya está iniciada; abre http://127.0.0.1:3000");
} else {
  frontend = spawn(process.execPath, [
    resolve(root, "frontend/node_modules/next/dist/bin/next"),
    "dev", "--hostname", "127.0.0.1",
  ], { cwd: resolve(root, "frontend"), stdio: "inherit", windowsHide: true });
  frontend.on("exit", (code) => {
    if (!stopping) { stop(); process.exitCode = code || 0; }
  });
}

console.log("\nPanel WordPress: http://127.0.0.1:9400/wp-admin/\nTienda: http://127.0.0.1:3000");
if (backend || frontend) console.log("Ctrl+C detiene los servidores iniciados por este comando.");
