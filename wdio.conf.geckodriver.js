const baseConfig = require('./wdio.conf')

exports.config = {
  ...baseConfig.config,
  services: ['geckodriver'],
  capabilities: [
    {
      maxInstances: 5,
      browserName: 'firefox',
      acceptInsecureCerts: true,
      'moz:firefoxOptions': {
        args: process.env.CI ? ['--headless'] : [],
      },
    },
  ]
}
