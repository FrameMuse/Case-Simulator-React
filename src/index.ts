/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import ReactDOM from "react-dom"
import App from "./app/Master"
// Smooth Scroll enabling for IOS
import smoothscroll from "smoothscroll-polyfill"
import { createElement } from "react"
// kick off the polyfill!
smoothscroll.polyfill()
// Render App
ReactDOM.render(createElement(App), document.getElementById("app"))