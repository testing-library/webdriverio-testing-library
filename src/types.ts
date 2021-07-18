import {
  Config as BaseConfig,
  BoundFunction as BoundFunctionBase,
  queries,
  waitForOptions,
  SelectorMatcherOptions,
  MatcherOptions,
} from '@testing-library/dom'

export type Config = Pick<
  BaseConfig,
  | 'asyncUtilTimeout'
  | 'computedStyleSupportsPseudoElements'
  | 'defaultHidden'
  | 'testIdAttribute'
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

export type ObjectQueryArg =
  | MatcherOptions
  | queries.ByRoleOptions
  | SelectorMatcherOptions
  | waitForOptions

export type QueryArg =
  | ObjectQueryArg
  | RegExp
  | number
  | string
  | undefined

export type SerializedObject = {
  serialized: 'object'
  [key: string]: SerializedArg
}
export type SerializedRegExp = {serialized: 'RegExp'; RegExp: string}
export type SerializedUndefined = {serialized: 'Undefined'; Undefined: true}

export type SerializedArg =
  | SerializedObject
  | SerializedRegExp
  | SerializedUndefined
  | number
  | string
