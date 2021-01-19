import {
  Config as BaseConfig,
  BoundFunction as BoundFunctionBase,
  queries,
} from '@testing-library/dom'
import {Element} from 'webdriverio'

export type Config = Pick<BaseConfig, 'testIdAttribute'>

export type WebdriverIOQueryReturnType<T> = T extends Promise<HTMLElement>
  ? Element
  : T extends HTMLElement
  ? Element
  : T extends Promise<HTMLElement[]>
  ? Element[]
  : T extends HTMLElement[]
  ? Element[]
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
