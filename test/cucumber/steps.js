/* eslint-disable @babel/new-cap, @babel/no-invalid-this */

const {Given, Then, Before} = require('@cucumber/cucumber')
const {setupBrowser} = require('../../src')

Before(function () {
  setupBrowser(browser)
})

Given('text is "Unique Delayed Button Text"', function () {
  this.text = 'Unique Delayed Button Text'
})

Then(
  'the element should be found using selectors or WTL',
  async function () {
    await(await browser.$(`button*=${this.text}`)).waitForDisplayed()
    // So now we are sure that this is in the document body
    // but the following now seems to fail, as I always get `null` returned:
    expect(await browser.queryByText(this.text)).not.toBeNull()
  },
)
