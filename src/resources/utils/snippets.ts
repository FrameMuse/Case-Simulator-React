/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

export function debounce<T extends any[] = any[]>(fn: (...args: T) => any, ms = 0) {
  let timeoutId: NodeJS.Timeout
  return function (this: any, ...args: T) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}