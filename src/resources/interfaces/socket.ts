/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { SocketActions as SA } from "app/socket/ClientSocket"

export interface SocketAction<T extends string, P extends object> {
  type: T
  payload: P
}

// type SS = { [K in SA]: K extends infer T ? string : never }

export type SocketCallback<T extends keyof SA = any> = (this: T, payload: SA[T]) => void
