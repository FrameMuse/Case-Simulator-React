/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import AuthRequired from "app/components/other/AuthRequired"
import { useSelector } from "react-redux"
import MiniAccount from "../../app/components/other/MiniAccount"
import MiniProfile from "./MiniProfile"

function auth() {
  const url = "https://api.standoffpay.ru/auth/vk"
  const { outerHeight, innerHeight, innerWidth } = window
  // Config
  const width = 500
  // Staff
  const top = outerHeight - innerHeight
  const left = innerWidth - width
  // Execute
  window.open(url, undefined, `resizable=yes, scrollbars=yes, status=no toolbar=no, menubar=no, location=no, width=${width}, height=350, top=${top} left=${left}`)
}

function TopbarProfile() {
  const user = useSelector(state => state.user)
  return (
    <div className="topbar__section">
      <AuthRequired onlyButton>
        <MiniAccount {...user} />
        <MiniProfile {...user} />
      </AuthRequired>
    </div>
  )
}

export default TopbarProfile