/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import React from "react"
import LiveFeed from "./live_feed"
import Navigation from "./navigation"
import Topbar from "./topbar"

export default function Header() {
  return (
    <header>
      <Topbar />
      <Navigation />
      <LiveFeed />
    </header>
  )
}
