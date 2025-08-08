const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// 1. Đọc tên app từ argv
const appName = process.argv[2];
if (!appName) {
  console.error('❌ Usage: node update-app-config.js <appName>');
  process.exit(1);
}

// 2. Khai báo đường dẫn
const distPath = path.join(__dirname, 'dist', appName);
const baseConfigPath = path.join(__dirname, 'apps', appName, 'app-config.json');
const appEnvPath = path.join(__dirname, 'apps', appName, '.env');
const rootEnvPath = path.join(process.cwd(), '.env');
const outputCfgPath = path.join(process.cwd(), 'app-config.json');

// 3. Kiểm tra thư mục build
if (!fs.existsSync(distPath)) {
  console.error(`❌ Không tìm thấy folder build: ${distPath}`);
  process.exit(1);
}

// 4. Đọc config gốc của app (nếu có) hoặc dùng mặc định
let baseAppConfig = {};
if (fs.existsSync(baseConfigPath)) {
  baseAppConfig = JSON.parse(fs.readFileSync(baseConfigPath, 'utf-8'));
} else {
  console.warn(`⚠️ Không tìm thấy file config gốc tại ${baseConfigPath}, dùng giá trị mặc định`);
  baseAppConfig = {
    title: appName,
    headerColor: "#000000",
    headerTitle: appName,
    textColor: "white",
    leftButton: "back",
    statusBar: "normal"
  };
}

// 5. Đọc danh sách file trong dist và phân loại
const files = fs.readdirSync(distPath);
const runtimeFiles = files.filter(f => /^runtime.*\.js$/.test(f));
const polyfillsFiles = files.filter(f => /^polyfills.*\.js$/.test(f));
const vendorFiles = files.filter(f => /^vendor.*\.js$/.test(f));
const mainFiles = files.filter(f => /^main.*\.js$/.test(f));
const cssFiles = files.filter(f => /^styles.*\.css$/.test(f));

const allJsFiles = files.filter(f => /\.js$/.test(f));
const syncJsFiles = [...runtimeFiles, ...polyfillsFiles, ...vendorFiles, ...mainFiles];
const asyncJsFiles = allJsFiles.filter(f => !syncJsFiles.includes(f));

// 6. Kết hợp thành app-config và ghi ra root
const appConfig = {
  app: {...(baseAppConfig.app ?? baseAppConfig)},
  listCSS: cssFiles,
  listSyncJS: syncJsFiles,
  listAsyncJS: asyncJsFiles
};
fs.writeFileSync(outputCfgPath, JSON.stringify(appConfig, null, 2));
console.log('✅ Đã update app-config.json:', outputCfgPath);

// 7. Đọc và parse .env gốc
let envVars = {};
if (fs.existsSync(rootEnvPath)) {
  envVars = dotenv.parse(fs.readFileSync(rootEnvPath, 'utf-8'));
}

// 8. Đọc .env của app (nếu có) và ghi đè
if (fs.existsSync(appEnvPath)) {
  const appEnvVars = dotenv.parse(fs.readFileSync(appEnvPath, 'utf-8'));
  envVars = {...envVars, ...appEnvVars};
}

// 9. Bổ sung biến động (nếu cần)
envVars.APP_NAME = appName;

// 10. Ghi lại .env ở project root
const outputEnv = Object.entries(envVars)
  .map(([key, val]) => `${key}=${val}`)
  .join('\n') + '\n';
fs.writeFileSync(rootEnvPath, outputEnv);
console.log('✅ Đã cập nhật .env ở project root');
