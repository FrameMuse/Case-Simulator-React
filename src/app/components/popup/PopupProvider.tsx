/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { createContext, CSSProperties, PureComponent } from "react"
import { addNotify } from "app/redux/reducers/errors-stack"
import store from "app/redux/store"
import usePopupContext from "../../../resources/hooks/usePopupContext"
import { classAssign, classWithModifiers, getlast } from "../../../resources/utils"
import Popup, { PopupQueue } from "../../controllers/Popup"
import { Article, ArticleProps } from "../formatting/article"

export const PopupContext = createContext<PopupQueue | undefined>(undefined)

export interface PopupProviderState {
  display: boolean
  queue: PopupQueue[]
}

export class PopupProvider extends PureComponent<{}, PopupProviderState> {
  state: PopupProviderState = {
    display: false,
    queue: []
  }

  constructor(props: any) {
    super(props)
    // Setup Popup updater
    Popup.update = (prevState, callback) => this.setState(prevState, callback)
  }

  render() {
    const { display, queue } = this.state
    const lastPopup = getlast(queue)
    const { Component, Params = {}, Resolve } = lastPopup || {}
    function outsideResolve() {
      if (!(Params?.closable ?? true)) {
        store.dispatch(addNotify("unclosablePopup"))
        return
      }

      Resolve?.()
    }
    return (
      <div className={classWithModifiers("popup", [display ? "display" : null])}>
        <div className="popup__container" onClick={outsideResolve}>
          {/* <div className="popup__cover" /> */}
          <div className="popup__inner" onClick={event => event.stopPropagation()}>
            <PopupContext.Provider value={lastPopup}>
              {Component && <Component {...Params} />}
            </PopupContext.Provider>
          </div>
        </div>
      </div >
    )
  }
}

export function PopupDefaultLayout({ children, className, title, desc, rowGap, width, nofooter }: { children: any; className?: string; rowGap?: string; width?: string; title?: any; desc?: any; nofooter?: boolean }) {
  const { Params } = usePopupContext()
  return (
    <div className="popup-content" style={{ width }}>
      {((Params?.title || Params?.desc) || (title || desc)) && (
        <Article className="popup-article" title={Params?.title || title} children={Params?.desc || desc} />
      )}
      <div className={classAssign(["popup-content__body", className])} style={{ rowGap }}>{children}</div>
      {/* {!nofooter && (
        <div className="popup-content__footer">
          <PopupText>
            Есть вопросы? Пишите в группу поддержки ВКонтакте
          </PopupText>
        </div>
      )} */}
    </div>
  )
}

export function PopupText({ children, style }: { children: any; style?: CSSProperties }) {
  return (
    <p className="popup-content__text" style={style}>
      {children}
    </p>
  )
}

export function PopupArticle(props: ArticleProps) {
  return (
    <Article className="popup-article" {...props} />
  )
}

export default PopupProvider
