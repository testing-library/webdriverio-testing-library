import {
  Config as BaseConfig,
  BoundFunction as BoundFunctionBase,
  queries,
} from '@testing-library/dom'

declare global {
  namespace WebdriverIO {
    interface Element extends ElementBase {}
  }
}

export type ElementBase = {
  $(
    selector: string | object,
  ): WebdriverIO.Element | Promise<WebdriverIO.Element>

  execute<T>(
    script: string | ((...args: any[]) => T),
    ...args: any[]
  ): Promise<T>

  execute<T>(script: string | ((...args: any[]) => T), ...args: any[]): T

  executeAsync(script: string | ((...args: any[]) => void), ...args: any[]): any
}

export type BrowserBase = {
  $(
    selector: string | object,
  ): WebdriverIO.Element | Promise<WebdriverIO.Element>

  addCommand<T extends boolean>(
    queryName: string,
    commandFn: (
      this: T extends true ? ElementBase : BrowserBase,
      ...args: any[]
    ) => void,
    isElementCommand?: T,
  ): any
}

export type Config = Pick<
  BaseConfig,
  | 'testIdAttribute'
  | 'asyncUtilTimeout'
  | 'computedStyleSupportsPseudoElements'
  | 'defaultHidden'
  | 'throwSuggestions'
>

export type WebdriverIOQueryReturnType<T> = T extends Promise<HTMLElement>
  ? WebdriverIO.Element
  : T extends HTMLElement
  ? WebdriverIO.Element
  : T extends Promise<HTMLElement[]>
  ? WebdriverIO.Element[]
  : T extends HTMLElement[]
  ? WebdriverIO.Element[]
  : T extends null
  ? null
  : never

export type WebdriverIOBoundFunction<T> = (
  ...params: Parameters<BoundFunctionBase<T>>
) => Promise<WebdriverIOQueryReturnType<ReturnType<BoundFunctionBase<T>>>>

export type WebdriverIOBoundFunctionSync<T> = (
  ...params: Parameters<BoundFunctionBase<T>>
) => WebdriverIOQueryReturnType<ReturnType<BoundFunctionBase<T>>>

export type WebdriverIOBoundFunctions<T> = {
  [P in keyof T]: WebdriverIOBoundFunction<T[P]>
}

export type WebdriverIOBoundFunctionsSync<T> = {
  [P in keyof T]: WebdriverIOBoundFunctionSync<T[P]>
}

export type WebdriverIOQueries = WebdriverIOBoundFunctions<typeof queries>
export type WebdriverIOQueriesSync = WebdriverIOBoundFunctionsSync<
  typeof queries
>

export type QueryName = keyof typeof queries
