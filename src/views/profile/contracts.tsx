/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import MutuableQuery, { useContextQuery } from "app/components/other/MutuableQuery"
import { QueryPagination } from "app/features/Query/QueryPagination"
import useTranslation from "resources/hooks/useTranslation"
import { inter } from "resources/utils"
import { getUserContracts, getUserStats } from "../../app/api/actions"
import { BranchContainer, BranchHeader, BranchSection } from "../../app/components/formatting/branch"
import ContractBox from "../../app/components/Standoff/ContractBox"
import Button from "../../app/components/UI/Button"
import Skeleton from "../../app/skeletons/skeleton"
import { User } from "../../resources/interfaces/user"
import BrowserHistory from "../../resources/stores/BrowserHistory"

export default function Contracts({ user }: { user: User }) {
  const emptyBlock = useTranslation(trans => trans.general.emptyBlock)
  const trans = useTranslation(trans => trans.views.profile.branch.contracts)
  const { payload: profile } = useContextQuery<ReturnType<typeof getUserStats>, null>()
  const contractsCount = profile?.rewards?.contracts
  return (
    <BranchSection>
      <BranchHeader title={trans.title} desc={contractsCount != null ? inter(trans.desc, { contractsCount }) : <Skeleton width="15em" />}>
        <Button onClick={() => BrowserHistory.push("/contract")}>{trans.getMore}</Button>
      </BranchHeader>
      <BranchContainer>
        <MutuableQuery action={getUserContracts(user.id)}>
          {({ payload }) => (
            <QueryPagination empty={emptyBlock.toContracts} emptyLink="/contract">
              <div className="contract-container">
                {payload.data.map((contract, index) => (
                  <ContractBox key={"contract_" + index} {...contract} item={contract.win_item} weaponList={contract.item_list} />
                ))}
              </div>
            </QueryPagination>
          )}
        </MutuableQuery>
      </BranchContainer>
    </BranchSection>
  )
}
