import path from 'path'
import {queries as baseQueries} from '@testing-library/dom'

import {setupBrowser} from '../../src'

describe('setupBrowser', () => {
  it('resolves with all queries', () => {
    const queries = setupBrowser(browser)

    const queryNames = Object.keys(queries)
    Object.keys(baseQueries).forEach((queryName) =>
      expect(queryNames.includes(queryName)).toBeTruthy(),
    )
  })

  it('binds queries to document body', async () => {
    const {getByText} = setupBrowser(browser)

    expect(await getByText('Page Heading')).toBeDefined()
  })

  it('still works after page navigation', async () => {
    const {getByText} = setupBrowser(browser)

    const goToPageTwoLink = await getByText('Go to Page 2')
    await goToPageTwoLink.click()

    expect(await getByText('second page')).toBeDefined()
  })

  it('still works after refresh', async () => {
    const {getByText} = setupBrowser(browser)

    await browser.refresh()

    expect(await getByText('Page Heading')).toBeDefined()
  })

  it('still works after session reload', async () => {
    const {getByText} = setupBrowser(browser)

    await browser.reloadSession()
    await browser.url(
      `file:///${path.join(__dirname, '../../test-app/index.html')}`,
    )

    expect(await getByText('Page Heading')).toBeDefined()
  })

  it('adds queries as browser commands', async () => {
    setupBrowser(browser)

    expect(await browser.getByText('Page Heading')).toBeDefined()
  })

  it('adds queries as element commands scoped to element', async () => {
    setupBrowser(browser)

    const nested = await browser.$('*[data-testid="nested"]')
    const button = await nested.getByText('Button Text')
    await button.click()

    expect(await button.getText()).toEqual('Button Clicked')
  })
})
