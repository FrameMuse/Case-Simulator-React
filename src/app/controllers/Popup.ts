/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../assets/scss/popup.scss"
// STAFF
import { PopupProviderState } from "../components/popup/PopupProvider"
import { AnyIfEmpty } from "react-redux"

// Types & Interfaces

export type PopupComponent<P> = (props: P) => JSX.Element

export interface PopupParams {
  id: any,
  title: any,
  desc: any,
  closable: boolean,

  // [K: string]: any
}

export interface LocalPopup extends PopupParams {
  thisResolve: PopupQueue["Resolve"]
}

export interface PopupQueue<P = {}> {
  Component: PopupComponent<Partial<PopupParams> & P>,
  Params: Partial<PopupParams> & P,
  Resolve: () => void
}

class Popup {
  public static update: (state: PopupProviderState | ((prevState: Readonly<PopupProviderState>, props: Readonly<{}>) => PopupProviderState | null) | null, callback?: (() => void) | undefined) => void
  public static open
    <P extends object = {}, AC extends Partial<PopupParams> & P = Partial<PopupParams> & P>
  (Component: PopupComponent<P>, ...[Params]: (AnyIfEmpty<P> extends object ? [AC] : [AC?])): Promise<void> {
      return new Promise<void>(function (resolve) {
        const popupWindow = { Component, Params, Resolve }
        Popup.push(popupWindow)
        function Resolve() {
          resolve()
          Popup.delete(popupWindow)
        }
      })
    }
  private static push(popupWindow: PopupQueue<any>) {
    Popup.update(state => ({
      display: true,
      queue: [...state.queue, popupWindow]
    }))
  }
  private static delete(popupWindow: PopupQueue<any>) {
    Popup.update(state => {
      const queue = state.queue.filter(pw => pw !== popupWindow)
      return {
        display: Boolean(queue.length),
        queue
      }
    })
  }
  public static resolveAll() {
    Popup.update(state => {
      state.queue.forEach(popup => popup.Resolve())
      return {
        display: false,
        queue: []
      }
    })
  }
}

export default Popup
