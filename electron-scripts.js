
// This will be manually added to package.json
const electronScripts = {
  "electron:dev": "concurrently \"npm run dev\" \"npm run electron:start\"",
  "electron:start": "cross-env NODE_ENV=development electron electron/main.js",
  "electron:build": "npm run build && electron-builder --config electron-builder.json",
  "electron:pack": "npm run build && electron-builder --dir --config electron-builder.json",
  "electron:windows": "npm run build && electron-builder --win --config electron-builder.json"
};

console.log("Add these scripts to your package.json:");
console.log(JSON.stringify(electronScripts, null, 2));
