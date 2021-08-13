/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { useEffect, useState } from "react"

export default function useSubscription<A extends unknown[] = unknown[]>(...args: A) {
  const [callback, setCallback] = useState({
    subscribe: () => {},
    unsubscribe: () => {}
  })

  useEffect(() => {
    callback.subscribe.apply(null, args as any)
    return () => {
      callback.unsubscribe
    }
  }, [callback])

  return [
    (subscribe: (...args: A) => void) => setCallback(data => ({ ...data, subscribe })),
    (unsubscribe: (...args: A) => void) => setCallback(data => ({ ...data, unsubscribe }))
  ]
}
