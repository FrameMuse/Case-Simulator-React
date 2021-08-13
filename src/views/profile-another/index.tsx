/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../assets/scss/views/profile/profile.scss"
// STAFF
import { fetchUserProfile, getUserStats } from "../../app/api/actions"
import MutuableQuery, { QueryProvider } from "../../app/components/other/MutuableQuery"
import MiniUser from "../../app/components/other/MiniUser"
import useMutableQuery from "../../resources/hooks/useCacheQuery"
import { ViewProps } from "../../resources/interfaces/router"
import Rewards from "../profile/rewards"
import Level from "../profile/level"
import AnotherProfileInventory from "./profile-another-inventory"

export default (props: ViewProps<{ userId: number }>) => {
  const { userId } = props.match.params
  return (
    <QueryProvider action={getUserStats(userId)}>
      <section className="section">
        <div className="profile profile--another">
          <MutuableQuery action={fetchUserProfile(userId)}>
            {({ payload }) => (
              <div className="profile__user-and-level">
                <MiniUser user={payload} />
                <Level user={payload} />
              </div>
            )}
          </MutuableQuery>
          <Rewards />
        </div>
      </section>
      <section className="section">
        <AnotherProfileInventory userId={userId} />
      </section>
    </QueryProvider>
  )
}
