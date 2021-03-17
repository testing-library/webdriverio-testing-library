import {WebdriverIOQueriesSync} from '../../src'

declare global {
  namespace WebdriverIO {
    interface Browser extends WebdriverIOQueriesSync {}
    interface Element extends WebdriverIOQueriesSync {}
  }
}
