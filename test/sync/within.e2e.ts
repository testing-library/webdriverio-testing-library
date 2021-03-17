import {within} from '../../src'

describe('within:sync', () => {
  it('returned queries can be used in sync tests using call', () => {
    const {getByText} = within(browser.$('body'))

    browser.call(async () => {
      expect(await getByText('Page Heading')).toBeDefined()
    })
  })
})
