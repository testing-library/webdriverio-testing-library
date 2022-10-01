/*
Types related to WebdriverIO are intentionally loose in order to support wdio
version 6 and 7 at the same time. Disable eslint rules that prevent that.
*/

/*
eslint-disable @typescript-eslint/no-explicit-any,
@typescript-eslint/no-namespace,
@typescript-eslint/no-empty-interface
*/

declare global {
  namespace WebdriverIO {
    interface Element {}
  }
}

export type $ = (
  selector: any,
) =>
  | ChainablePromiseElementBase<Promise<WebdriverIO.Element>>
  | Promise<WebdriverIO.Element>
  | WebdriverIO.Element

export type $$ = (
  selector: any,
) =>
  | ChainablePromiseArrayBase<Promise<WebdriverIO.Element>>
  | Promise<WebdriverIO.Element[]>
  | WebdriverIO.Element[]

export type ChainablePromiseElementBase<T> = Promise<T> & {$: $}
export type ChainablePromiseArrayBase<T> = Promise<T>

export type SelectorsBase = {
  $: $
  $$: $$
}

export type ElementBase = SelectorsBase & {
  parent: {
    execute<T>(
      script: string | ((...args: any[]) => T),
      ...args: any[]
    ): Promise<T>
  
    execute<T>(script: string | ((...args: any[]) => T), ...args: any[]): T
  
    executeAsync(script: string | ((...args: any[]) => void), ...args: any[]): any
  }
}

export type BrowserBase = SelectorsBase & {
  addCommand<T extends boolean>(
    queryName: string,
    commandFn: (
      this: T extends true ? ElementBase : BrowserBase,
      ...args: any[]
    ) => void,
    isElementCommand?: T,
  ): any
}
