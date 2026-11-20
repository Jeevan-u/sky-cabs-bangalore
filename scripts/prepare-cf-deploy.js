const fs = require("fs");
const path = require("path");

const rootDir = process.cwd();
const outDir = path.join(rootDir, "out-cf");
const nextDir = path.join(rootDir, ".next");
const publicDir = path.join(rootDir, "public");

console.log("Preparing Cloudflare Pages distribution bundle in out-cf/...");

// Clean and recreate outDir
if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir, { recursive: true });

// 1. Copy public directory assets to out-cf/
if (fs.existsSync(publicDir)) {
  console.log("Copying public assets...");
  fs.cpSync(publicDir, outDir, { recursive: true });
}

// 2. Copy .next/static to out-cf/_next/static
const nextStaticDir = path.join(nextDir, "static");
const targetNextStaticDir = path.join(outDir, "_next", "static");
if (fs.existsSync(nextStaticDir)) {
  console.log("Copying Next.js static chunks to _next/static...");
  fs.mkdirSync(path.dirname(targetNextStaticDir), { recursive: true });
  fs.cpSync(nextStaticDir, targetNextStaticDir, { recursive: true });
}

// 3. Copy HTML and RSC files from .next/server/app
const serverAppDir = path.join(nextDir, "server", "app");
function copyAppFiles(src, relativePath = "") {
  if (!fs.existsSync(src)) return;
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const rel = path.join(relativePath, entry.name);

    if (entry.isDirectory()) {
      // Don't recurse into internal segments if not needed, but keep subpages
      copyAppFiles(srcPath, rel);
    } else if (entry.isFile()) {
      if (entry.name.endsWith(".html") || entry.name.endsWith(".rsc")) {
        const destPath = path.join(outDir, rel);
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

if (fs.existsSync(serverAppDir)) {
  console.log("Copying HTML and RSC pages from .next/server/app...");
  copyAppFiles(serverAppDir);
}

// 4. Copy 404 page if exists
const p404 = path.join(nextDir, "server", "pages", "404.html");
if (fs.existsSync(p404)) {
  fs.copyFileSync(p404, path.join(outDir, "404.html"));
}

console.log("✅ Distribution bundle prepared successfully in out-cf/!");
