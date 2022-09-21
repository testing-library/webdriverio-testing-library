const baseConfig = require('./wdio.conf')

exports.config = {
  ...baseConfig.config,
  services: ['chromedriver'],
}
