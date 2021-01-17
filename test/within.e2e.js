const {within, setupBrowser} = require('../src')

describe('within', () => {
  it('scopes queries to element', async () => {
    const nested = await browser.$('*[data-testid="nested"]')

    const button = await within(nested).getByText('Button Text')
    await button.click()

    expect(await button.getText()).toEqual('Button Clicked')
  })

  it('works with elements from GetBy query', async () => {
    const {getByTestId} = await setupBrowser(browser)
    const nested = await getByTestId('nested')

    const button = await within(nested).getByText('Button Text')
    await button.click()

    expect(await button.getText()).toEqual('Button Clicked')
  })

  it('works with elements from AllBy query', async () => {
    const {getAllByTestId} = await setupBrowser(browser)

    const nestedDivs = await getAllByTestId(/nested/)
    expect(nestedDivs).toHaveLength(2)

    const nested = within(nestedDivs[1])
    expect(await nested.getByText('Button Text')).toBeDefined()
    expect(await nested.getByText('text only in 2nd nested')).toBeDefined()
  })
})
