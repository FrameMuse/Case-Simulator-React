/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../../assets/scss/components/mini-account.scss"
// STAFF
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { User } from "../../../resources/interfaces/user"
import Popup from "../../controllers/Popup"
import WhatIsBonusPopup from "../popup/common/WhatIsBonusPopup"
import Button from "../UI/Button"
import useTranslation from "resources/hooks/useTranslation"
import Icon from "../UI/Icon"
import { ClientAPI } from "app/api/client"
import { fetchGetDemo } from "app/api/actions"
import WebStore from "resources/stores/store"
import { addNotify } from "resources/reducers/errors-stack"
import { classWithModifiers } from "resources/utils"

export function getDemo() {
  ClientAPI
    .query(fetchGetDemo)
    .then(({ error }) => {
      if (error) return
      WebStore.store.dispatch(addNotify("recievedDemo", "success"))
    })
}

function MiniAccount(user: User) {
  const history = useHistory()
  const topbar = useTranslation(trans => trans.header.topbar)
  const modes = useSelector(state => state.modes)
  const depositEvent = () => modes.demo ? getDemo() : history.push("/payment")

  const balanceModifiers: string[] = []
  if (modes.demo) {
    balanceModifiers.push("demo")
  }
  balanceModifiers.push("right-coll")
  balanceModifiers.push("mobile-deposit")
  return (
    <div className="mini-account">
      <div className="mini-account__label" onClick={() => Popup.open(WhatIsBonusPopup)}>
        <div className="mini-account__text"><span>{user.bonus_balance.toLocaleString()}</span> <Icon name="b" /></div>
      </div>
      <div className={classWithModifiers("mini-account__label", balanceModifiers)} onClick={depositEvent}>
        <span className="mini-account__text">{(modes.demo ? user.demo_balance : user.balance).toPrice()}</span>
      </div>
      <Button
        style={{ width: "24ch", justifyContent: "center" }}
        modify="left-coll"
        color={modes.demo ? "orange" : "green"}
        padding="1.25em"
        onClick={depositEvent}>{modes.demo ? topbar.buttons?.getDemo : topbar.buttons?.topUp}</Button>
    </div>
  )
}

export default MiniAccount
