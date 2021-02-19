/*
Test sync behaviour in a js file so that typescript doesn't complain about the
async commands being declared elsewhere
*/

const sync = require('@wdio/sync').default

const {setupBrowser} = require('../src')

describe('sync mode', () => {
  it('can be used with browser commands', async () => {
    setupBrowser(browser)

    await sync(() => {
      const pageHeading = browser.getByText('Page Heading')

      expect(pageHeading).toBeDefined()
      expect(pageHeading.getText()).toEqual('Page Heading')
    })
  })

  it('can be used with element commands', async () => {
    setupBrowser(browser)

    await sync(() => {
      const button = browser
        .$('*[data-testid="nested"]')
        .getByText('Button Text')

      button.click()

      expect(button.getText()).toEqual('Button Clicked')
    })
  })
})
