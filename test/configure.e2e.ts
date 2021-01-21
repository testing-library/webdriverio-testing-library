import {setupBrowser, configure} from '../src';

describe('configure', () => {
  beforeEach(() => {
    configure({testIdAttribute: 'data-automation-id'})
  })
  afterEach(() => {
    configure({})
  })

  it('supports alternative testIdAttribute', async () => {
    const {getByTestId} = setupBrowser(browser)

    expect(await getByTestId('image-with-random-alt-tag')).toBeDefined()
  })

  it('works after navigation', async () => {
    const {getByText, findByTestId} = setupBrowser(browser)

    const goToPageTwoLink = await getByText('Go to Page 2')
    await goToPageTwoLink.click()

    expect(await findByTestId('page2-thing')).toBeDefined()
  })
})
