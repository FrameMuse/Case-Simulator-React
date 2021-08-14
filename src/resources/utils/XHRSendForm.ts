/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { RegularObject } from "resources/interfaces/Object"
import store from "app/redux/store"

export function XHRSendForm<T = any>(xhr = new XMLHttpRequest(), path: string, data: FormData | RegularObject) {
  const formData = data instanceof FormData ? data : CustomFormData(data)

  // function onProgress(event: { loaded: number; total: number; }) {
  //   const progress = event.loaded / event.total
  //   const percent = Math.round(progress * 100)
  // };

  xhr.open("POST", "https://api." + window.location.hostname + "/api" + path, true)
  xhr.responseType = "json"
  xhr.withCredentials = true

  return new Promise<T>((resolve, reject) => {
    xhr.onerror = function () {
      store.dispatch({
        type: "NOTIFY_STACK/ADD",
        payload: {
          type: "error",
          text: "Ошибка в запросе"
        }
      })

      reject("Ошибка в запросе")
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        resolve(xhr.response)
      }
    }
    xhr.send(formData)
  })
}

export function CustomFormData(data: RegularObject) {
  const formData = new FormData()

  for (const key in data) {
    const chunk = data[key]

    if (chunk instanceof Array) {
      chunk.map(piece => formData.append(key + "[]", piece))
    } else {
      formData.append(key, chunk)
    }
  }

  return formData
}
