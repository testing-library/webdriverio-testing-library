/* eslint-disable babel/no-invalid-this, no-eval */

import path from 'path'
import fs from 'fs'
import {queries as baseQueries} from '@testing-library/dom'

import {
  BrowserBase,
  Config,
  ElementBase,
  QueryName,
  WebdriverIOQueries,
} from './types'

declare global {
  interface Window {
    TestingLibraryDom: typeof baseQueries & {
      configure: typeof configure
    }
  }
}

const DOM_TESTING_LIBRARY_UMD_PATH = path.join(
  require.resolve('@testing-library/dom'),
  '../../',
  'dist/@testing-library/dom.umd.js',
)
const DOM_TESTING_LIBRARY_UMD = fs
  .readFileSync(DOM_TESTING_LIBRARY_UMD_PATH)
  .toString()

const SIMMERJS = fs
  .readFileSync(require.resolve('simmerjs/dist/simmer.js'))
  .toString()

let _config: Partial<Config>

async function injectDOMTestingLibrary(container: ElementBase) {
  const shouldInject = await container.execute(function () {
    return {
      domTestingLibrary: !window.TestingLibraryDom,
      simmer: !window.Simmer,
    }
  })

  if (shouldInject.domTestingLibrary) {
    await container.execute(DOM_TESTING_LIBRARY_UMD)
  }

  if (shouldInject.simmer) {
    await container.execute(SIMMERJS)
  }

  if (_config) {
    await container.execute(function (config: Config) {
      window.TestingLibraryDom.configure(config)
    }, _config)
  }
}

function serializeObject(object: Object): Object {
  return Object.entries(object)
    .map(([key, value]) => [key, serializeArg(value)])
    .reduce((acc, [key, value]) => ({...acc, [key]: value}), {})
}

function serializeArg(arg: any) {
  if (arg instanceof RegExp) {
    return {RegExp: arg.toString()}
  }
  if (typeof arg === 'undefined') {
    return {Undefined: true}
  }
  if (arg && typeof arg === 'object') {
    return serializeObject(arg)
  }
  return arg
}

function executeQuery(
  query: QueryName,
  container: HTMLElement,
  ...args: any[]
) {
  const done = args.pop() as (result: any) => void

  // @ts-ignore
  function deserializeObject(object) {
    return Object.entries(object)
      .map(([key, value]) => [key, deserializeArg(value)])
      .reduce((acc, [key, value]) => ({...acc, [key]: value}), {})
  }

  // @ts-ignore
  function deserializeArg(arg) {
    if (arg && arg.RegExp) {
      return eval(arg.RegExp)
    }
    if (arg && arg.Undefined) {
      return undefined
    }
    if (arg && typeof arg === 'object') {
      return deserializeObject(arg)
    }
    return arg
  }

  const [matcher, options, waitForOptions] = args.map(deserializeArg)

  Promise.resolve(
    window.TestingLibraryDom[query](
      container,
      matcher,
      options,
      waitForOptions,
    ),
  )
    .then((result) => {
      if (!result) {
        return done(null)
      }
      if (Array.isArray(result)) {
        return done(
          result.map((element) => ({selector: window.Simmer(element)})),
        )
      }
      return done({selector: window.Simmer(result)})
    })
    .catch((e) => done(e.message))
}

function createQuery(element: ElementBase, queryName: string) {
  return async (...args: any[]) => {
    await injectDOMTestingLibrary(element)

    const result = await element.executeAsync(
      executeQuery,
      queryName,
      element,
      ...args.map(serializeArg),
    )

    if (typeof result === 'string') {
      throw new Error(result)
    }

    if (!result) {
      return null
    }

    if (Array.isArray(result)) {
      return Promise.all(result.map(({selector}) => element.$(selector)))
    }

    return element.$(result.selector)
  }
}

function within(element: ElementBase) {
  return Object.keys(baseQueries).reduce(
    (queries, queryName) => ({
      ...queries,
      [queryName]: createQuery(element, queryName),
    }),
    {},
  ) as WebdriverIOQueries
}

function setupBrowser(browser: BrowserBase) {
  const queries: {[key: string]: any} = {}

  Object.keys(baseQueries).forEach((key) => {
    const queryName = key as keyof typeof baseQueries

    const query = async (...args: any[]) => {
      const body = await browser.$('body')
      return within(body)[queryName](...args)
    }

    // add query to response queries
    queries[queryName] = query

    // add query to BrowserObject
    browser.addCommand(queryName, query)

    // add query to Elements
    browser.addCommand(
      queryName,
      function (this, ...args) {
        return within(this)[queryName](...args)
      },
      true,
    )
  })

  return queries as WebdriverIOQueries
}

function configure(config: Partial<Config>) {
  _config = config
}

export * from './types'
export {within, setupBrowser, configure}
