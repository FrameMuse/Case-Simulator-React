/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "assets/scss/base.scss"
import "assets/scss/svg.scss"
import "assets/scss/icons.scss"
import "assets/scss/components/button.scss"
import "assets/scss/components/weapon.scss"
import "assets/scss/components/case-state.scss"
import "assets/scss/components/user-stats.scss"
import "assets/scss/components/bonus-box.scss"
import "assets/scss/components/errors-stack.scss"
import "assets/scss/popups/auth.scss"
import "assets/scss/popups/bonus-single.scss"
import "assets/scss/popups/withdraw.scss"
import "assets/scss/views/cases-lists.scss"
import "assets/scss/views/case.scss"
import "assets/scss/views/payment.scss"
// STAFF
import React, { Component, StrictMode, Suspense, useEffect } from "react"
import { Provider } from "react-redux"
import { Router as BrowserRouter } from "react-router-dom"
import store from "./redux/store"
import Enhancments from "./Enhancments"
import { ClientContextProvider } from "react-fetching-library"
import { ClientAPI } from "./api/client"
import Loader from "./components/other/Loader"
import MiniWheel from "./components/other/MiniWheel"
import ErrorsStack from "./components/other/ErrorsStack"
import BrowserHistory from "../resources/stores/BrowserHistory"
import BonusCaseNotify from "./components/UI/BonusCaseNotify"
import PopupNotification from "./components/popup/PopupNotification"
import useTranslation from "resources/hooks/useTranslation"
// import * as serviceWorker from "serviceWorker"

const Header = React.lazy(() => import("../views/header"))
const Router = React.lazy(() => import("./Router"))
const Footer = React.lazy(() => import("../views/footer"))
const PopupProvider = React.lazy(() => import("./components/popup/PopupProvider"))

// ------ Safari audio fix
function unlockAudio() {
  const sound1 = new Audio()

  sound1.play().catch(() => { })
  sound1.pause()
  sound1.currentTime = 0

  document.body.removeEventListener("keydown", unlockAudio)
  document.body.removeEventListener("mousedown", unlockAudio)
  document.body.removeEventListener("touchstart", unlockAudio)
}

document.body.addEventListener("keydown", unlockAudio)
document.body.addEventListener("mousedown", unlockAudio)
document.body.addEventListener("touchstart", unlockAudio)
// ------ Safari audio fix
export default class App extends Component {
  render() {
    return (
      <StrictMode>
        <ClientContextProvider client={ClientAPI}>
          <Provider store={store}>
            <BrowserRouter history={BrowserHistory}>
              <Enhancments />
              <StandoffCase />
            </BrowserRouter>
          </Provider>
        </ClientContextProvider>
      </StrictMode>
    )
  }
}

function StandoffCase() {
  return (
    <Suspense fallback={<Loader />}>
      <Header />
      <main>
        <Router lazy />
      </main>
      <Footer />
      <MiniWheel />
      <BonusCaseNotify />
      <PopupNotification />
      <PopupProvider />
      <ErrorsStack />
      <UpdateMetaTags />
    </Suspense>
  )
}

function UpdateMetaTags() {
  const head = useTranslation(trans => trans.head)
  useEffect(() => {
    function setMeta(query: string, content?: string) {
      const meta = window.document.querySelector(`[${query}]`) as HTMLMetaElement | null
      if (meta && content) {
        meta.content = content
      }
    }

    window.document.title = head.title || "title"

    setMeta("name=\"description\"", head.description)
    setMeta("name=\"keywords\"", head.keywords)
    setMeta("property=\"og:title\"", head["og:title"])
    setMeta("property=\"og:description\"", head["og:description"])

  }, [head])
  return null
}
