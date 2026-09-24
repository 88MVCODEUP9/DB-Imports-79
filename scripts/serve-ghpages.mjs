// Simula o GitHub Pages (project site): site servido em /NOME-REPO/,
// raiz do artifact = dist/client. Requisição /davi/* -> dist/client/*.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "dist", "client");
const BASE = process.env.PAGES_BASE || "/davi"; // prefixo simulado (ex.: /nome-do-repo)
const PORT = 8090;

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".rsc": "text/plain",
  ".webmanifest": "application/manifest+json",
  ".yml": "text/plain",
  ".gitkeep": "text/plain",
};

async function send(res, file, fallback) {
  try {
    const st = await stat(file);
    if (st.isDirectory()) file = join(file, "index.html");
    else if (file.endsWith("/")) file = join(file, "index.html");
    const body = await readFile(file);
    const ext = file.slice(file.lastIndexOf(".") + 1).toLowerCase();
    res.writeHead(200, { "content-type": MIME["." + ext] || "application/octet-stream" });
    res.end(body);
  } catch {
    // GitHub Pages: /repo/ e rotas não encontradas servem o index.html (SPA)
    res.writeHead(200, { "content-type": "text/html" });
    res.end(await readFile(join(ROOT, "index.html")));
  }
}

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.startsWith(BASE)) pathname = pathname.slice(BASE.length) || "/";
    const file = normalize(join(ROOT, pathname));
    await send(res, file);
  } catch (e) {
    if (!res.headersSent) {
      res.writeHead(500, { "content-type": "text/plain" });
      res.end(String(e));
    } else {
      res.end();
    }
  }
}).listen(PORT, "127.0.0.1", () => {
  console.log(`GH Pages simulator em http://localhost:${PORT}${BASE}/`);
});