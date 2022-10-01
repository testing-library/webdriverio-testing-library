import {setupBrowser} from '../../src'

describe('chaining', () => {
  it('can chain browser getBy queries', async () => {
    setupBrowser(browser)

    const button = await browser
      .getByTestId$('nested')
      .getByText$('Button Text')

    await button.click()

    expect(await button.getText()).toEqual('Button Clicked')
  })

  it('can chain element getBy queries', async () => {
    const {getByTestId} = setupBrowser(browser)

    const nested = await getByTestId('nested')
    await nested.getByText$('Button Text').click()

    expect(await browser.getByText$('Button Clicked').getText()).toEqual(
      'Button Clicked',
    )
  })

  it('can chain browser getAllBy queries', async () => {
    setupBrowser(browser)

    await browser.getByTestId$('nested').getAllByText$('Button Text')[0].click()

    expect(await browser.getAllByText('Button Clicked')).toHaveLength(1)
  })

  it('can chain element getAllBy queries', async () => {
    const {getByTestId} = setupBrowser(browser)

    const nested = await getByTestId('nested')
    await nested.getAllByText$('Button Text')[0].click()

    expect(await nested.getAllByText('Button Clicked')).toHaveLength(1)
  })
})
