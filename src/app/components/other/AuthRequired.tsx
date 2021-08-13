/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import Popup from "app/controllers/Popup"
import { useSelector } from "react-redux"
import useTranslation from "resources/hooks/useTranslation"
import AuthPopup from "../popup/common/AuthPopup"
import Button from "../UI/Button"

export default function AuthRequired(props: { padding?: string; children?: any; onlyButton?: boolean }) {
  const trans = useTranslation(trans => trans.authRequired)
  const user = useSelector(state => state.user)
  const auth = () => Popup.open(AuthPopup)

  if (user.authed) {
    return props.children || null
  }

  if (props.onlyButton) {
    return (
      <Button color="yellow" padding={props.padding} onClick={auth}>{trans.button}</Button>
    )
  }

  return (
    <div className="error">
      <div className="error__title">{trans.title}</div>
      <p className="error__desc">{trans.desc}</p>
      <Button color="yellow" onClick={auth}>{trans.button}</Button>
    </div>
  )
}
