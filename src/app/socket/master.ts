/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { io, Socket } from "socket.io-client"
import { ValueOf } from "../../resources/interfaces/Object"
import { SocketCallback as SC } from "../../resources/interfaces/socket"
import WebStore from "../../resources/stores/store"
import { SocketActions as SA } from "./ClientSocket"

export default class SocketIO<
  A extends keyof SA = keyof SA,
  P extends ValueOf<SA> = any,
  > {
  public serving?: boolean
  private entries = new Set<[A, SC<any>]>()
  io?: Socket

  public constructor(
    private settings?: Record<string, string | number>
  ) { }

  public setupQuery(params: Record<string, string | number>) {
    if (this.settings) {
      const query = Object.keys(params).map(key => key + "=" + params[key]).join(", ")

      this.settings.query = query
    }
  }

  public serveSocket() {
    this.serving = true

    this.io = io("https://" + window.location.hostname, this.settings)

    this.io.on("standoffcase:App\\Events\\LiveEvent", (action: { type: A, payload: P }) => {
      const { type, payload } = action
      const callbacks = this.getCallbacks(type)

      if (process.env.NODE_ENV === "development") {
        console.log("%c" + type, "font-size: 1.5em; color: #009688;", payload)
      }

      if (callbacks.length > 0) {
        callbacks.forEach(callback => {
          callback.call(type, payload)
        })
        return
      }

      WebStore.store.dispatch(action)
    })
  }

  public emit(type: string, payload?: object) {
    if (!this.io) return

    this.io.emit(type, payload)
    // console.log(this.io);
    if (process.env.NODE_ENV === "development") {
      console.log("%c" + type, "font-size: 1.5em; color: #8d0096;", payload)
    }
  }

  private getCallbacks<T extends A = any>(findAction: T) {
    const callbacks: SC<any>[] = []
    const entries = this.entries.entries()
    let entry: IteratorResult<[[A, SC<any>], [A, SC<any>]]>
    while (entry = entries.next(), !entry.done) {
      const [action, callback] = entry.value[1]
      if (action === findAction) {
        callbacks.push(callback)
      }
    }
    return callbacks
  }

  public add<T extends A = any>(action: T, callback: SC<T>) {
    this.entries.add([action, callback])
  }

  public delete<T extends A = any>(action: T, callback: SC<T>) {
    this.entries.delete([action, callback])
  }

  public subscribe<T extends A = any>(action: T, callback: SC<T>) {
    this.add(action, callback)
    return () => {
      this.delete(action, callback)
    }
  }
}
