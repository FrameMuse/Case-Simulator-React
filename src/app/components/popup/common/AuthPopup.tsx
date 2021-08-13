/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// IMAGES
import renderedDudePNG from "assets/images/rendered-dude.png"
// STAFF
import "assets/scss/popups/auth.scss"
import Button from "app/components/UI/Button"
import { PopupArticle, PopupDefaultLayout } from "../PopupProvider"
import { classWithModifiers } from "resources/utils"
import { Link } from "react-router-dom"
import useTranslation from "resources/hooks/useTranslation"
import Popup from "app/controllers/Popup"

export default function AuthPopup() {
  const trans = useTranslation(trans => trans.popup.Auth)
  return (
    <PopupDefaultLayout rowGap="2em">
      <img src={renderedDudePNG} alt="dude" className="auth-dude" />
      <PopupArticle title={trans.title}>
        {trans.desc}
      </PopupArticle>
      <div className="auth-buttons">
        <AuthButton type="vk">{trans.methods?.vk}</AuthButton>
        <AuthButton type="fb">{trans.methods?.fb}</AuthButton>
        <AuthButton type="tw">{trans.methods?.tw}</AuthButton>
        <AuthButton type="yt">{trans.methods?.yt}</AuthButton>
      </div>
      <p className="auth-text">
        {trans.confirmation} <Link to="/terms-contacts" onClick={() => Popup.resolveAll()}>{trans.termsContacts}</Link>
      </p>
    </PopupDefaultLayout>
  )
}

function AuthButton<K = "vk" | "fb" | "tw" | "yt">({ type, children }: { type: K & string, children: any }) {
  function commitAuth(key: K) {
    if (!process.env.REACT_APP_SITE_AUTH_URL) {
      throw "Auth analed"
    }
    const link = `${process.env.REACT_APP_SITE_AUTH_URL}/${key}`
    // @ts-expect-error
    window.location = link
  }
  return (
    <Button className={classWithModifiers("auth-buttons__button", [type])} onClick={() => commitAuth(type)}>{children}</Button>
  )
}
