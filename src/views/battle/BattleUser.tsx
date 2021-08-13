/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SVG
import UnkwonUserImage from "../../assets/svg/unknown.svg"
// STAFF
import useTranslation from "../../resources/hooks/useTranslation"
import { classWithModifiers } from "../../resources/utils"
import { BattleState, BattleUser as BattleUserType } from "./battle"

interface BattleUserProps {
  user?: BattleUserType
  type: "host" | "opponent"
}

function BattleUser({ user, type, winner, status }: BattleUserProps & BattleState) {
  const battle = useTranslation(trans => trans.battle)
  const modifiers: Array<string | null> = [status]

  if (winner !== null && status === "finish") {
    if (type === winner) {
      modifiers.push("won")
    }

    if (type !== winner) {
      modifiers.push("lose")
    }

    if (winner === "draw") {
      modifiers.push("draw")
    }
  }

  // const statusTranslation = battle.user_status[status === "searching" ? "searching" : type]
  const statusText = (battle.user_status as any)?.[status] || battle.user_status?.[type]

  return (
    <div className="battle-user">
      <span className={classWithModifiers("battle-user__circle", modifiers)}></span>
      <img src={user?.photo || UnkwonUserImage} alt="avatar" className="battle-user__image" />
      <div className="battle-user__info">
        <span className="battle-user__name">
          {user ? user.firstname + " " + user.lastname : battle.user_status?.["opponent"]}
        </span>
        <span className="battle-user__status">{statusText}</span>
      </div>
    </div>
  )
}

export default BattleUser
