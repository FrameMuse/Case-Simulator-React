/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import ReactDOM from "react-dom"
import App from "./app/Master"
import * as serviceWorker from "./serviceWorkerRegistration"
// Smooth Scroll enabling for IOS
import smoothscroll from "smoothscroll-polyfill"
import ErrorsReveal from "FrameMuse/production/errors-reveal"
import WebStore from "resources/stores/store"
import { updateUserInfo } from "resources/reducers/user"
// Error report
export const errorReports: ErrorEvent[] = []
window.addEventListener("error", event => {
  errorReports.push(event)
  // Reveal errors updating 'user'
  WebStore.store.dispatch(updateUserInfo({ balance: Date.now() }))
})
ReactDOM.render(<ErrorsReveal />, document.getElementById("reports"))
// kick off the polyfill!
smoothscroll.polyfill()
// Render App
ReactDOM.render(<App />, document.getElementById("app"))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// const serviceWorkerConfig = {
//   onUpdate(registration: ServiceWorkerRegistration) {
//     const waitingServiceWorker = registration.waiting

//     function skipWating() {
//       if (waitingServiceWorker) {
//         waitingServiceWorker.addEventListener("statechange", (event: any) => {
//           if (event.target.state === "activated") {
//             window.location.reload()
//           }
//         })
//         waitingServiceWorker.postMessage({ type: "SKIP_WAITING" })
//       }
//     }

//     ReactDOM.render(
//       <span className="serviceWorker-update" onClick={skipWating}>Вышло новое обновление сайта</span>,
//       document.getElementById("update")
//     )
//   },
//   onWaiting(registration: ServiceWorkerRegistration) {
//     this.onUpdate(registration)
//   }
// }
// serviceWorker.register(serviceWorkerConfig)
// serviceWorker.unregister()

serviceWorker.unregister()
require("./serviceWorker-firebase")
