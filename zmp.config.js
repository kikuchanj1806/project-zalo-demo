// zmp.config.js
const APP = process.env.APP  || 'zalo-app1';

const configs = {
  'zalo-app1': {
    projectName: 'zalo-app1',
    appId: '2925298306504468674',
    sourceRoot: 'apps/zalo-app1/src',
    outputRoot: 'dist/zalo-app1',      // ➜ output path cho app1
    port: 8081,
    h5: { publicPath: '/' }
  },
  'zalo-app2': {
    projectName: 'fly shop',
    appId: '3958693035821891113',
    sourceRoot: 'apps/zalo-app2/src',
    outputRoot: 'dist/zalo-app2',      // ➜ output path cho app2
    port: 8082,
    h5: { publicPath: '/' }
  }
};

if (!configs[APP]) {
  throw new Error(`Unknown APP "${APP}". Available: ${Object.keys(configs).join(', ')}`);
}

module.exports = configs[APP];
