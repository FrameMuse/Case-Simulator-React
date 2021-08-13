/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../assets/scss/views/profile/profile.scss"
// STAFF
import MiniUser from "../../app/components/other/MiniUser"
import Level from "./level"
import ProfileBranch from "./branch"
import Rewards from "./rewards"
import { getUserStats } from "../../app/api/actions"
import { useSelector } from "react-redux"
import AuthRequired from "app/components/other/AuthRequired"
import FrequentQuestions from "views/support/FrequentQuestions"
import { QueryProvider } from "app/components/other/MutuableQuery"
import { useEffect } from "react"
import WebStore from "resources/stores/store"
import { switchMode } from "resources/reducers/modes"

export default () => {
  return (
    <AuthRequired>
      <Profile />
      <section className="section section--1">
        <FrequentQuestions defaultQuestion="cases" />
      </section>
    </AuthRequired>
  )
}

function Profile() {
  const user = useSelector(state => state.user)
  const modes = useSelector(state => state.modes)
  useEffect(() => {
    if (modes.demo) {
      WebStore.store.dispatch(switchMode("demo", false))
    }
  }, [modes])
  return (
    <QueryProvider unsuspend action={getUserStats(user.id)}>
      <section className="section section--emphasize">
        <div className="profile">
          <div className="profile__user-and-level">
            <MiniUser />
            <Level />
          </div>
          <Rewards />
        </div>
      </section>
      <section className="section">
        <ProfileBranch />
      </section>
    </QueryProvider>
  )
}
