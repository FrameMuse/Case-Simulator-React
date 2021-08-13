/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// STAFF
import Empty from "app/components/other/Empty"
import Standoff from "app/controllers/Standoff"
import { useSelector } from "react-redux"
import useTranslation from "resources/hooks/useTranslation"
import BrowserHistory from "resources/stores/BrowserHistory"
import { inter } from "resources/utils"
import { fetchUserBonuses } from "../../app/api/actions"
import { BranchContainer, BranchHeader, BranchSection } from "../../app/components/formatting/branch"
import MutuableQuery, { useContextQuery } from "../../app/components/other/MutuableQuery"
import Button from "../../app/components/UI/Button"
import DetailBonusBox from "../wheel/DetailBonusBox"

export default function Bonuses() {
  const user = useSelector(state => state.user)
  const trans = useTranslation(trans => trans.views.profile.branch.bonuses)
  return (
    <BranchSection>
      <MutuableQuery requireAuth action={fetchUserBonuses(user.id)}>
        {({ payload }) => (
          <>
            <BranchHeader title={trans.title} desc={inter(trans.desc, { bonusesCount: payload.length })}>
              <Button onClick={() => BrowserHistory.push("/wheel/free")}>{trans.getMore}</Button>
            </BranchHeader>
            <BranchContainer>
              <BonusesContainer />
            </BranchContainer>
          </>
        )}
      </MutuableQuery>
    </BranchSection>
  )
}

export interface BonusProps {
  item_id: number
  status: number
  item: {
    condition: number
  }
}

export function BonusesContainer({ noEvent }: { noEvent?: boolean }) {
  const trans = useTranslation(trans => trans.general.emptyBlock)
  const { loading, payload, modifyPayload } = useContextQuery<ReturnType<typeof fetchUserBonuses>>()
  const bonusesCount: Record<number, number> = {}
  const bonuses = payload.filter(bonus => {
    const prevCount = bonusesCount[bonus.item_id] || 0
    const currCount = bonusesCount[bonus.item_id] = prevCount + 1

    if (currCount >= 2) {
      return false
    }

    return true
  })
  const bonusesSorted = bonuses.sort((bonusA, bonusB) => bonusB.item_id - bonusA.item_id)

  function activateBonus(bonus: BonusProps) {
    Standoff
      .activateBonus(bonus)
      .then((response) => {
        if (response?.error) return

        const newPayload = [...payload]
        const bonusIndex = payload.indexOf(bonus)

        newPayload.splice(bonusIndex, 1)
        modifyPayload(newPayload)
      })
  }

  if (!loading && payload.length <= 0) {
    return <Empty link="/wheel/free">{trans.toBonuses}</Empty>
  }

  return (
    <div className="bonuses-container">
      {bonusesSorted.map((bonus, index) => (
        <DetailBonusBox
          id={bonus.item_id}
          count={bonusesCount[bonus.item_id]}
          onClick={noEvent ? undefined : (() => activateBonus(bonus))}
          key={"bonus_box_" + index}
        />
      ))}
    </div>
  )
}
