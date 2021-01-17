const {queries: baseQueries} = require('@testing-library/dom')

const {setupBrowser} = require('../src')

describe('setupBrowser', () => {
  it('resolves with all queries', async () => {
    const queries = await setupBrowser(browser)

    const queryNames = Object.keys(queries)
    Object.keys(baseQueries).forEach((queryName) =>
      expect(queryNames.includes(queryName)).toBeTruthy(),
    )
  })

  it('binds queries to document body', async () => {
    const {getByText} = await setupBrowser(browser)

    expect(await getByText('Page Heading')).toBeDefined()
  })

  it('still works after page navigation', async () => {
    const {getByText} = await setupBrowser(browser)

    const goToPageTwoLink = await getByText('Go to Page 2')
    await goToPageTwoLink.click()

    expect(await getByText('second page')).toBeDefined()
  })

  it('still works after refresh', async () => {
    const {getByText} = await setupBrowser(browser)

    await browser.refresh()

    expect(await getByText('Page Heading')).toBeDefined()
  })

  it('adds queries as browser commands', async () => {
    await setupBrowser(browser);

    expect(await browser.getByText('Page Heading')).toBeDefined()
  })

  it('adds queries as element commands scoped to element', async () => {
    await setupBrowser(browser);

    const nested = await browser.$('*[data-testid="nested"]');
    const button = await nested.getByText('Button Text')
    await button.click()

    expect(await button.getText()).toEqual('Button Clicked')
  })
})
