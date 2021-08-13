/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { useSelector } from "react-redux"
import useTranslation from "resources/hooks/useTranslation"
import { inter } from "resources/utils"
import { fetchUpgrades } from "../../app/api/actions"
import { BranchContainer, BranchHeader, BranchSection } from "../../app/components/formatting/branch"
import MutuableQuery from "../../app/components/other/MutuableQuery"
import { QueryPagination } from "../../app/features/Query/QueryPagination"
import UpgradeBox from "../../app/components/Standoff/UpgradeBox"
import Button from "../../app/components/UI/Button"
import Skeleton from "../../app/skeletons/skeleton"
import BrowserHistory from "../../resources/stores/BrowserHistory"

export default function Upgrades() {
  const emptyBlock = useTranslation(trans => trans.general.emptyBlock)
  const trans = useTranslation(trans => trans.views.profile.branch.upgrades)
  const user = useSelector(state => state.user)
  return (
    <MutuableQuery requireAuth action={fetchUpgrades(user.id)}>
      {({ loading, payload }) => (
        <BranchSection>
          <BranchHeader title={trans.title} desc={loading ? <Skeleton width="10em" /> : inter(trans.desc, { upgradesCount: payload.total })}>
            <Button padding="1.75em 3em" onClick={() => BrowserHistory.push("/upgrade")}>{trans.getMore}</Button>
          </BranchHeader>
          <BranchContainer>
            <QueryPagination empty={emptyBlock.toUpgrades} emptyLink="/upgrade">
              <div className="upgrades-container">
                {payload.data.map((upgrade, index) => (
                  <UpgradeBox key={"upgrade_" + index} {...upgrade} />
                ))}
              </div>
            </QueryPagination>
          </BranchContainer>
        </BranchSection>
      )}
    </MutuableQuery>
  )
}
