/*
eslint-disable
@typescript-eslint/no-namespace,
@typescript-eslint/no-empty-interface
*/

import {WebdriverIOQueriesChainable, WebdriverIOQueries} from '../../src'
import {SelectorsBase} from '../../src/wdio-types'

declare global {
  namespace WebdriverIO {
    interface Browser
      extends WebdriverIOQueries,
        WebdriverIOQueriesChainable<Browser> {}
    interface Element
      extends WebdriverIOQueries,
        WebdriverIOQueriesChainable<Element> {}
  }
}

declare module 'webdriverio' {
  interface ChainablePromiseElement<T extends SelectorsBase | undefined>
    extends WebdriverIOQueriesChainable<T> {}
}
