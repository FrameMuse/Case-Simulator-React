/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { useSelector } from "react-redux"
import useTranslation from "resources/hooks/useTranslation"
import { fetchBattles, getUserStats } from "../../app/api/actions"
import { BranchContainer, BranchHeader, BranchSection } from "../../app/components/formatting/branch"
import MutuableQuery, { QueryCunsumer } from "../../app/components/other/MutuableQuery"
import { QueryPagination } from "../../app/features/Query/QueryPagination"
import BattleBox from "../../app/components/Standoff/BattleBox"
import Button from "../../app/components/UI/Button"
import Skeleton from "../../app/skeletons/skeleton"
import { WeaponItemProps } from "../../resources/interfaces/weapon"
import BrowserHistory from "../../resources/stores/BrowserHistory"

export interface BattleItem {
  id: number
  battle_id: number
  status: number
  user_id: number
  item_id: number
  item: WeaponItemProps
}

export default function Battles() {
  const user = useSelector(state => state.user)
  const trans = useTranslation(trans => trans.general.emptyBlock)
  return (
    <BranchSection>
      <QueryCunsumer<ReturnType<typeof getUserStats>, null>>
        {({ loading, payload: stats }) => (
          <BranchHeader title="Сражения" desc={loading ? <Skeleton width="15em" /> : "Вы участвовали в " + ((stats?.rewards?.battles.win || 0) + (stats?.rewards?.battles.lose || 0)) + " сражениях"}>
            <Button onClick={() => BrowserHistory.push("/battles")}>Новое сражение</Button>
          </BranchHeader>
        )}
      </QueryCunsumer>
      <MutuableQuery action={fetchBattles(user.id)}>
        {({ payload }) => (
          <BranchContainer>
            <QueryPagination empty={trans.toBattles} emptyLink="/battles">
              <div className="battles-container">
                {payload.data.map((battle, index) => (
                  <BattleBox key={"battle_" + index} {...battle} />
                ))}
              </div>
            </QueryPagination>
          </BranchContainer>
        )}
      </MutuableQuery>
    </BranchSection>
  )
}
