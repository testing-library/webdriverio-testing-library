const computeFsPaths = require('selenium-standalone/lib/compute-fs-paths')
const createDefaultOps = require('selenium-standalone/lib/default-config')

const baseConfig = require('./wdio.conf')
const defaultOps = createDefaultOps()

const fsPaths = computeFsPaths({
  ...defaultOps,
  seleniumVersion: defaultOps.version,
  drivers: {
    firefox: {
      version: process.env.GECKODRIVER_VERSION || 'latest',
      arch: process.arch,
    },
  },
})

exports.config = {
  ...baseConfig.config,
  services: [
    ['geckodriver', {geckodriverCustomPath: fsPaths.firefox.installPath}],
  ],
  capabilities: [
    {
      maxInstances: 5,
      browserName: 'firefox',
      acceptInsecureCerts: true,
      'moz:firefoxOptions': {
        args: process.env.CI ? ['-headless'] : [],
      },
    },
  ],
}
