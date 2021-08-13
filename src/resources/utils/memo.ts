/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

export function Memo<T>(fn: T & Function) {
  const cache = new Map()
  return function (...args: any) {
    const props = args.toString()
    if (cache.has(props)) {
      return cache.get(props)
    } else {
      const result = fn(...args)
      cache.set(props, result)
      return result
    }
  } as unknown as T
}
