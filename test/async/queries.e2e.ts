import {setupBrowser} from '../../src'

describe('queries', () => {
  it('queryBy resolves with matching element', async () => {
    const {queryByText} = setupBrowser(browser)

    const button = await queryByText('Unique Button Text')
    expect(await button?.getText()).toEqual('Unique Button Text')
  })

  it('queryBy resolves with null when there are no matching elements', async () => {
    const {queryByText} = setupBrowser(browser)

    const button = await queryByText('Text that does not exist')
    expect(button).toBeNull()
  })

  it('getBy resolves with matching element', async () => {
    const {getByText} = setupBrowser(browser)

    const button = await getByText('Unique Button Text')
    expect(await button.getText()).toEqual('Unique Button Text')
  })

  it('getBy rejects when there are no matching elements', async () => {
    const {getByText} = setupBrowser(browser)

    await expect(getByText('Text that does not exist')).rejects.toThrow()
  })

  it('getBy rejects when there are multiple matching elements', async () => {
    const {getByText} = setupBrowser(browser)

    await expect(getByText('Button Text')).rejects.toThrow()
  })

  it('findBy waits for matching element and resolves with it', async () => {
    const {findByText} = setupBrowser(browser)

    const button = await findByText('Unique Delayed Button Text')
    expect(await button.getText()).toEqual('Unique Delayed Button Text')
  })

  it('findBy rejects when there is no matching element after timeout', async () => {
    const {findByText} = setupBrowser(browser)

    await expect(findByText('Text that does not exist')).rejects.toThrow()
  })

  it('findBy rejects when there are multiple matching elements', async () => {
    const {findByText} = setupBrowser(browser)

    await expect(findByText('Delayed Button Text')).rejects.toThrow()
  })

  it('queryAllBy resolves with matching elements', async () => {
    const {queryAllByText} = setupBrowser(browser)

    const chans = await queryAllByText('Button Text')
    expect(chans).toHaveLength(2)
  })

  it('queryAllBy resolves with an empty array when there are no matching elements', async () => {
    const {queryAllByText} = setupBrowser(browser)

    const chans = await queryAllByText('Text that does not exist')
    expect(chans).toHaveLength(0)
  })

  it('getAllBy resolves matching elements', async () => {
    const {getAllByText} = setupBrowser(browser)

    const buttons = await getAllByText('Button Text')
    expect(buttons).toHaveLength(2)
  })

  it('getAllBy rejects when there are no matching elements', async () => {
    const {getAllByText} = setupBrowser(browser)

    await expect(getAllByText('Text that does not exist')).rejects.toThrow()
  })

  it('findAllBy waits for matching elements and resolves with them', async () => {
    const {findAllByText} = setupBrowser(browser)

    const buttons = await findAllByText('Delayed Button Text')
    expect(buttons).toHaveLength(2)
  })

  it('findAllBy rejects when there are no matching elements after timeout', async () => {
    const {findAllByText} = setupBrowser(browser)

    await expect(findAllByText('Text that does not exist')).rejects.toThrow()
  })

  it('can click resolved elements', async () => {
    const {getByText, getAllByText} = setupBrowser(browser)

    const uniqueButton = await getByText('Unique Button Text')
    const buttons = await getAllByText('Button Text')

    await uniqueButton.click()
    await buttons[0].click()
    await buttons[1].click()

    expect(await uniqueButton.getText()).toEqual('Button Clicked')
    expect(await buttons[0].getText()).toEqual('Button Clicked')
    expect(await buttons[1].getText()).toEqual('Button Clicked')
  })

  it('support Regular Expressions as matchers', async () => {
    const {getAllByText} = setupBrowser(browser)

    const chans = await getAllByText(/jackie chan/i)
    expect(chans).toHaveLength(2)
  })

  it('support options', async () => {
    const {getAllByText} = setupBrowser(browser)

    const chans = await getAllByText('Jackie Chan', {exact: false})
    expect(chans).toHaveLength(2)
  })

  it('support Regular Expressions in options', async () => {
    const {getAllByRole} = setupBrowser(browser)

    const chans = await getAllByRole('button', {
      name: /jackie chan/i,
    })
    expect(chans).toHaveLength(2)
  })

  it('support waitFor options', async () => {
    const {findByText} = setupBrowser(browser)

    await expect(
      findByText('Unique Delayed Button Text', {}, {timeout: 0}),
    ).rejects.toThrow()
  })

  it('support being passed undefined arguments', async () => {
    const {findByText} = setupBrowser(browser)

    const button = await findByText(
      'Unique Delayed Button Text',
      undefined,
      undefined,
    )
    expect(await button.getText()).toEqual('Unique Delayed Button Text')
  })

  it('retains error messages', async () => {
    const {getByText} = setupBrowser(browser)

    await expect(getByText('Text that does not exist')).rejects.toThrowError(
      /Unable to find an element with the text/,
    )
  })
})
