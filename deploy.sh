#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="${SCRIPT_DIR}"
BUILD_DIR="${APP_DIR}/build"
TARGET_DIR="${HELP_DEPLOY_TARGET:-${APP_DIR}/../nginx/help}"

if ! command -v npm >/dev/null 2>&1; then
  echo "Error: npm is required but not found on PATH."
  exit 1
fi

echo "[help-app] Building app..."
cd "${APP_DIR}"
npm run build

if [[ ! -d "${BUILD_DIR}" ]]; then
  echo "Error: build output directory not found: ${BUILD_DIR}"
  exit 1
fi

echo "[help-app] Generating SPA route entrypoints..."
node <<'NODE'
const fs = require('fs');
const path = require('path');

const appDir = process.cwd();
const buildDir = path.join(appDir, 'build');
const sidebarPath = path.join(appDir, 'public', 'docs', 'sidebar.json');
const indexHtmlPath = path.join(buildDir, 'index.html');

if (!fs.existsSync(sidebarPath)) {
  throw new Error(`Missing sidebar config: ${sidebarPath}`);
}
if (!fs.existsSync(indexHtmlPath)) {
  throw new Error(`Missing build index.html: ${indexHtmlPath}`);
}

const sidebar = JSON.parse(fs.readFileSync(sidebarPath, 'utf8'));
const routeIds = Array.from(
  new Set(
    (sidebar.docs || [])
      .map((item) => item && item.id)
      .filter((id) => typeof id === 'string' && id.length > 0 && id !== 'index')
  )
);
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

for (const id of routeIds) {
  fs.writeFileSync(path.join(buildDir, `${id}.html`), indexHtml);
  const routeDir = path.join(buildDir, id);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), indexHtml);
}

console.log(`[help-app] Route entrypoints generated for: ${routeIds.join(', ')}`);
NODE

sync_dir() {
  local src_dir="$1"
  local dst_dir="$2"
  echo "[help-app] Deploying build/ to ${dst_dir}..."
  mkdir -p "${dst_dir}"

  if command -v rsync >/dev/null 2>&1; then
    rsync -a --delete "${src_dir}/" "${dst_dir}/"
  else
    echo "Warning: rsync not found; using cp fallback."
    rm -rf "${dst_dir:?}/"*
    cp -a "${src_dir}/." "${dst_dir}/"
  fi
}

sync_dir "${BUILD_DIR}" "${TARGET_DIR}"

echo "[help-app] Deploy complete."
