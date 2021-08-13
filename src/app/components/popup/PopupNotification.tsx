/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "assets/scss/popups/popup-notificaiton.scss"
import { useEffect, useState } from "react"
// STAFF
import Button from "../UI/Button"
import { PopupArticle } from "./PopupProvider"

export default function PopupNotification() {
  const [display, setDisplay] = useState(Boolean(window.Notification) && Notification.permission === "default")
  function subscribe() {
    if (!window.Notification) return
    Notification
      .requestPermission()
      .then(permission => {
        if (permission !== "default") {
          setDisplay(false)
        }
      })
  }
  if (!display) return null
  return (
    <div className="popup-notification">
      <PopupArticle title="Подписывайся">
        {"Поспеши опробовать новый кейс \n первым!"}
      </PopupArticle>
      <div className="popup-notification__buttons">
        <Button padding="1.25em 2em" onClick={() => setDisplay(false)}>
          <em>Позже</em>
        </Button>
        <Button padding="1.25em" color="yellow" onClick={subscribe}>Подписаться</Button>
      </div>
    </div>
  )
}
