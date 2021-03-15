import {within, setupBrowser} from '../../src'

describe('within', () => {
  it('scopes queries to element', async () => {
    const nested = await browser.$('*[data-testid="nested"]')

    const button = await within(nested).getByText('Button Text')
    await button.click()

    expect(await button.getText()).toEqual('Button Clicked')
  })

  it('works with elements from GetBy query', async () => {
    const {getByTestId} = setupBrowser(browser)
    const nested = await getByTestId('nested')

    const button = await within(nested).getByText('Button Text')
    await button.click()

    expect(await button.getText()).toEqual('Button Clicked')
  })

  it('works with elements from AllBy query', async () => {
    const {getAllByTestId} = setupBrowser(browser)

    const nestedDivs = await getAllByTestId(/nested/)
    expect(nestedDivs).toHaveLength(2)

    const nested = within(nestedDivs[1])
    expect(await nested.getByText('Button Text')).toBeDefined()
    expect(await nested.getByText('text only in 2nd nested')).toBeDefined()
  })
})
