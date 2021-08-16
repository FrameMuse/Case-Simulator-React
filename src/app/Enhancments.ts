/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { ClientAPI } from "./api/client"
import Viewport from "./controllers/Viewport"

declare global {
  interface String {
    toLocaleDateTime(onlyDate?: boolean): string
  }

  interface Number {
    toPrice(): string
    toLocaleDateTime(onlyDate?: boolean): string
  }

  interface Date {
    toLocaleDateTime(onlyDate?: boolean): string
  }
}

export default function Enhancments() {
  const history = useHistory()
  // History
  let prevLocation: any

  useEffect(() => {
    // Viewport
    Viewport.onUpdateCallback = function (key, value) {
      const viewport = document.getElementById("viewport") as HTMLMetaElement

      if (viewport) {
        // viewport.content = `width=${value}, initial-scale=1.0, minimum-scale=1, maximum-scale=3, shrink-to-fit=no`
      }
    }
    Viewport.listen({
      "(min-width: 1260px)": "desktop",
      "(max-width: 1260px) and (min-width: 600px)": "tablet",
      "(max-width: 560px)": "mobile"
    })


    history.listen((location) => {
      if (!location) return null
      if ((location.state as any)?.noScrollBack) return null
      if (location.pathname !== prevLocation?.pathname) {
        if (location.pathname.search("profile/") < 0) {
          window.scrollTo(0, 0)
        }
      }

      prevLocation = location
    })
    return () => { }
  }, [])
  // NULL
  return null
}

if (process.env.NODE_ENV === "development") {
  // @ts-ignore
  window.ClientAPI = ClientAPI
  // @ts-ignore
  window.getDefenitions = function () {
    console.log(`%c
    // STATUS
      // 1 - активный предмет
      // 2 - проданный предмет
      // 3 - предмет ушёл в контракт
      // 4 - предмет ушёл в upgrade
      // 5 - активированый бонус
      // 6 - выведенный предмет
      
    // TYPE
      // 1 - выпало из кейсы
      // 2 - выпало из контракта
      // 3 - выпал из upgrade
    `, "font-size: 1.5em")

  }
}

// if (process.env.NODE_ENV === "production") {
//   console.log = () => { }
// }


// Extentions
require("../resources/ext")
