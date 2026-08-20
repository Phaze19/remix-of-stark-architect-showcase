#!/usr/bin/env node
/**
 * Verifies that every CDN-hosted image asset (.asset.json pointer) resolves
 * with HTTP 200 on the production host.
 *
 * Usage:  node scripts/verify-assets.mjs [--host https://rationalengineers.lovable.app]
 * Exits 1 when any asset returns a non-200 status (missing / broken image).
 * Network-level failures are reported as warnings and do not fail the build.
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const DEFAULT_HOST = "https://rationalengineers.lovable.app";
const hostArgIndex = process.argv.indexOf("--host");
const HOST = (
  hostArgIndex > -1 ? process.argv[hostArgIndex + 1] : process.env.ASSET_VERIFY_HOST || DEFAULT_HOST
).replace(/\/$/, "");

const ROOT = path.resolve(import.meta.dirname, "..");
const SKIP_DIRS = new Set(["node_modules", "dist", ".git", ".lovable"]);

async function collectPointers(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      out.push(...(await collectPointers(path.join(dir, entry.name))));
    } else if (entry.name.endsWith(".asset.json")) {
      out.push(path.join(dir, entry.name));
    }
  }
  return out;
}

const pointers = await collectPointers(ROOT);
if (pointers.length === 0) {
  console.log("[verify-assets] no .asset.json pointers found — nothing to check");
  process.exit(0);
}

console.log(`[verify-assets] checking ${pointers.length} asset(s) against ${HOST}`);

const broken = [];
const warnings = [];

await Promise.all(
  pointers.map(async (pointer) => {
    const rel = path.relative(ROOT, pointer);
    let url;
    try {
      ({ url } = JSON.parse(await readFile(pointer, "utf8")));
    } catch (error) {
      broken.push(`${rel} — unreadable pointer: ${error.message}`);
      return;
    }
    if (!url) {
      broken.push(`${rel} — pointer has no "url" field`);
      return;
    }
    const absolute = url.startsWith("http") ? url : `${HOST}${url}`;
    try {
      const res = await fetch(absolute, { method: "GET", headers: { Range: "bytes=0-0" } });
      if (res.status !== 200 && res.status !== 206) {
        broken.push(`${rel} — HTTP ${res.status} for ${absolute}`);
      }
    } catch (error) {
      warnings.push(`${rel} — network error for ${absolute}: ${error.message}`);
    }
  })
);

for (const warning of warnings) console.warn(`[verify-assets] WARN  ${warning}`);

if (broken.length > 0) {
  console.error(`\n[verify-assets] FAILED — ${broken.length} asset(s) do not resolve:`);
  for (const item of broken) console.error(`  ✗ ${item}`);
  process.exit(1);
}

console.log(
  `[verify-assets] OK — all ${pointers.length - warnings.length} reachable asset(s) returned 200`
);
