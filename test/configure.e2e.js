const {setupBrowser, configure} = require('../src')

describe('configure', () => {
  beforeEach(() => {
    configure({testIdAttribute: 'data-automation-id'})
  })
  afterEach(() => {
    configure(null)
  })

  it('supports alternative testIdAttribute', async () => {
    const {getByTestId} = await setupBrowser(browser)

    expect(await getByTestId('image-with-random-alt-tag')).toBeDefined()
  })

  it('works after navigation', async () => {
    const {getByText, findByTestId} = await setupBrowser(browser)

    const goToPageTwoLink = await getByText('Go to Page 2')
    await goToPageTwoLink.click()

    expect(await findByTestId('page2-thing')).toBeDefined()
  })
})
