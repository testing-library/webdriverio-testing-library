/*
eslint-disable
@typescript-eslint/no-namespace,
@typescript-eslint/no-empty-interface
*/

import {WebdriverIOQueries} from '../../src'

declare global {
  namespace WebdriverIO {
    interface Browser extends WebdriverIOQueries {}
    interface Element extends WebdriverIOQueries {}
  }
}
