const computeFsPaths = require('selenium-standalone/lib/compute-fs-paths');
const createDefaultOps = require('selenium-standalone/lib/default-config');

const baseConfig = require('./wdio.conf')
const defaultOps = createDefaultOps()

const fsPaths = computeFsPaths({
  ...defaultOps,
  seleniumVersion: defaultOps.version,
  drivers: {
    chrome: {
      version: process.env.CHROMEDRIVER_VERSION || 'latest',
      arch: process.arch,
    },
  },
})

exports.config = {
  ...baseConfig.config,
  services: [
    ['chromedriver', {chromedriverCustomPath: fsPaths.chrome.installPath}],
  ],
}
