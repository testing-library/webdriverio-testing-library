import {setupBrowser, configure} from '../../src'

describe('configure', () => {
  afterEach(() => {
    configure({})
  })

  it('supports setting testIdAttribute', async () => {
    configure({testIdAttribute: 'data-automation-id'})

    const {getByTestId} = setupBrowser(browser)

    expect(await getByTestId('image-with-random-alt-tag')).toBeDefined()
  })

  it('supports setting asyncUtilTimeout', async () => {
    configure({asyncUtilTimeout: 0})

    const {findByText} = setupBrowser(browser)

    await expect(() =>
      findByText('Unique Delayed Button Text'),
    ).rejects.toThrowError()
  })

  it('supports setting computedStyleSupportsPseudoElements', async () => {
    configure({computedStyleSupportsPseudoElements: true})

    const {getByRole} = setupBrowser(browser)

    expect(
      await getByRole('button', {name: 'Named by pseudo element'}),
    ).toBeDefined()
  })

  it('supports setting defaultHidden', async () => {
    configure({defaultHidden: true})

    const {getByRole} = setupBrowser(browser)

    expect(await getByRole('button', {name: 'Hidden button'})).toBeDefined()
  })

  it('supports setting throwSuggestions', async () => {
    configure({throwSuggestions: true})

    const {getByTestId} = setupBrowser(browser)

    await expect(() =>
      getByTestId('button-that-should-not-use-testid'),
    ).rejects.toThrowError(
      'TestingLibraryElementError: A better query is available',
    )
  })

  it('works after navigation', async () => {
    const {getByText, findByAltText} = setupBrowser(browser)

    const goToPageTwoLink = await getByText('Go to Page 2')
    await goToPageTwoLink.click()

    expect(await findByAltText('page two thing')).toBeDefined()
  })
})
