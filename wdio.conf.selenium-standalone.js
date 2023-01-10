const baseConfig = require('./wdio.conf')

exports.config = {
  ...baseConfig.config,
  capabilities: [
    ...baseConfig.config.capabilities,
    {
      maxInstances: 5,
      browserName: 'firefox',
      acceptInsecureCerts: true,
      'moz:firefoxOptions': {
        args: process.env.CI ? ['--headless'] : [],
      },
    },
  ],
  services: [
    [
      'selenium-standalone',
      {
        drivers: {
          firefox: process.env.GECKODRIVER_VERSION || true,
          chrome: process.env.CHROMEDRIVER_VERSION || true,
        },
      },
    ],
  ],
}
