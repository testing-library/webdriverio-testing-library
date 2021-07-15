/*
eslint-disable
@typescript-eslint/no-namespace,
@typescript-eslint/no-empty-interface
*/

import {WebdriverIOQueriesSync} from '../../src'

declare global {
  namespace WebdriverIO {
    interface Browser extends WebdriverIOQueriesSync {}
    interface Element extends WebdriverIOQueriesSync {}
  }
}
