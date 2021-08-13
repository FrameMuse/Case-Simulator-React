/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { getUserStats } from "app/api/actions"
import { QueryCunsumer } from "app/components/other/MutuableQuery"
import { useSelector } from "react-redux"
import { Route, Switch } from "react-router-dom"
import Branch, { BranchContainer, BranchLink, BranchNav, BranchSidebar } from "../../app/components/formatting/branch"
import ButtonTool from "../../app/components/UI/ButtonTool"
import Skeleton from "../../app/skeletons/skeleton"
import useTranslation from "../../resources/hooks/useTranslation"
import BrowserHistory from "../../resources/stores/BrowserHistory"
// Pages
import Battles from "./battles"
import Bonuses from "./bonuses"
import Contracts from "./contracts"
import Deposits from "./deposits"
import Inventory from "./inventory"
import Referal from "./referal"
import Settings from "./settings"
import Upgrades from "./upgrades"

// export const ProfileHistory = createHisto

export default function ProfileBranch() {
  const user = useSelector(state => state.user)
  const trans = useTranslation(trans => trans.views.profile.branch)
  return (
    <Branch id="branch" className="profile-branch">
      {/* <Router history={ProfileHistory}> */}
      <BranchSidebar>
        <div className="branch__header profile-branch__header">
          <div className="branch-article">
            <p className="branch-article__text">{trans.title}</p>
            <h2 className="branch-article__title">{user.balance != null ? user.balance.toPrice() : <Skeleton />}</h2>
          </div>
          <ButtonTool padding="1.5em 2.5em" color="green" onClick={() => BrowserHistory.push("/payment")}>{trans.topUp}</ButtonTool>
        </div>
        <QueryCunsumer<ReturnType<typeof getUserStats>, null>>
          {({ payload }) => (
            <BranchContainer>
              <BranchNav>
                <BranchLink to="/profile/" status={payload?.items}>{trans.menu?.items}</BranchLink>
                <BranchLink to="/profile/contracts" status={payload?.rewards?.contracts}>{trans.menu?.contracts}</BranchLink>
                <BranchLink to="/profile/battles" status={(payload?.rewards?.battles?.win || 0) + (payload?.rewards?.battles?.lose || 0)}>{trans.menu?.battles}</BranchLink>
                <BranchLink to="/profile/upgrades" status={(payload?.rewards?.upgrades?.win || 0) + (payload?.rewards?.upgrades?.lose || 0)}>{trans.menu?.upgrades}</BranchLink>
                <BranchLink to="/profile/bonuses" status={payload?.bonuses || 0}>{trans.menu?.bonuses}</BranchLink>
                <BranchLink to="/profile/deposits">{trans.menu?.topUpHistory}</BranchLink>
              </BranchNav>
              <BranchNav>
                <BranchLink to="/profile/settings">{trans.menu?.settings}</BranchLink>
                <BranchLink to="/profile/referal">{trans.menu?.referalSystem}</BranchLink>
              </BranchNav>
              <BranchNav>
                <BranchLink to="/profile/exit" onClick={() => window.location = process.env.REACT_APP_SITE_AUTH_URL + "/logout" as any}>{trans.menu?.exit}</BranchLink>
              </BranchNav>
            </BranchContainer>
          )}
        </QueryCunsumer>
      </BranchSidebar>

      <Switch>
        <Route exact path="/profile/" render={() => <Inventory />} />
        <Route exact path="/profile/contracts">
          <Contracts user={user} />
        </Route>
        <Route exact path="/profile/battles" render={() => <Battles />} />
        <Route exact path="/profile/upgrades" render={() => <Upgrades />} />
        <Route exact path="/profile/deposits" render={() => <Deposits />} />
        <Route exact path="/profile/bonuses" render={() => <Bonuses />} />
        <Route exact path="/profile/settings" render={() => <Settings />} />
        <Route exact path="/profile/referal" render={() => <Referal />} />
      </Switch>
      {/* </Router> */}
    </Branch>
  )
}
