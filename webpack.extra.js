// webpack.extra.js
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { join } = require('path');

// Lấy tên app từ biến môi trường (ví dụ APP_NAME=app2)
const appName = process.env.APP_NAME || 'app1';
const appRoot = join(__dirname, `apps/zalo-${appName}`);

// Chỉ copy thư mục img
const imgSrc = join(appRoot, 'src/assets/img');

module.exports = {
  output: {
    libraryTarget: 'umd',
    globalObject: 'this',
    filename: '[name].js',
  },
  experiments: {
    outputModule: false,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: imgSrc,      // apps/zalo-<appName>/src/assets/img
          to: 'assets/img'   // thành dist/zalo-<appName>/assets/img
        }
      ]
    })
  ]
};
