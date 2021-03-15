import {setupBrowser} from '../../src'

describe('setupBrowser:sync', () => {
  it('adds queries as sync browser commands', () => {
    setupBrowser(browser)

    const pageHeading = browser.getByText('Page Heading')

    expect(pageHeading).toBeDefined()
    expect(pageHeading.getText()).toEqual('Page Heading')
  })

  it('adds queries as sync element commands scoped to element', () => {
    setupBrowser(browser)

    const button = browser.$('*[data-testid="nested"]').getByText('Button Text')

    button.click()

    expect(button.getText()).toEqual('Button Clicked')
  })

  it('queries returned by setupBrowser can be used in sync tests using call', () => {
    const {getByText} = setupBrowser(browser)

    browser.call(async () => {
      expect(await getByText('Page Heading')).toBeDefined()
    })
  })
})
