/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// IMAGES
import TriangleSVG from "assets/svg/triangle"
// SCSS
import "../../../assets/scss/components/battle-box.scss"
// STAFF
import { Person } from "../../../resources/interfaces/user"
import BrowserHistory from "../../../resources/stores/BrowserHistory"
import { classWithModifiers, getCaseImage, getWeaponImage } from "../../../resources/utils"
import { BattleItem } from "../../../views/profile/battles"
import { WeaponItemProps } from "resources/interfaces/weapon"
import Icon from "../UI/Icon"
import { Link } from "react-router-dom"

function BattleWeapon(props: WeaponItemProps) {
  const modifiers: string[] = []

  modifiers.push("transparent")
  modifiers.push(props.class_name.toLowerCase())

  return (
    <div className={classWithModifiers("weapon", modifiers)}>
      <div className="weapon__layout">
        <div className="weapon-image">
          <div className="weapon-image__triangle">
            <TriangleSVG />
          </div>
          <img src={getWeaponImage(props.id)} alt="weapon" className="weapon-image__image battle-weapon__image" />
          <div className="battle-box-hint">
            <div className="battle-box-hint__text">{props.name} - {props.subname}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export interface BattleBoxProps {
  id: number,
  case_id: number
  owner_id: number
  user_id: number
  status: number
  creator: Person
  opponent: Person
  items: [BattleItem, BattleItem]
}

const statuses: any = {
  1: "creator-win",
  2: "opponent-win",
  3: "draw"
}

export default function BattleBox({ id, case_id, status, creator, opponent, items }: BattleBoxProps) {
  const [creatorWeapon, opponentWeapon] = items
  const winner: "creator-win" | "opponent-win" | "draw" = statuses[status]

  if (!creator || !opponent) {
    return null
  }

  function rejoin() {
    BrowserHistory.push("/battles/playing", {
      battle_id: id,
      ownerItem: creatorWeapon
    })
  }

  return (
    <div className={classWithModifiers("battle-box", [winner])}>
      <div className="battle-box__splitter" />
      <div className="battle-box__weapons">
        {opponentWeapon && (
          <div className="battle-box__weapon battle-box__weapon--creator">
            <BattleWeapon {...opponentWeapon.item} />
          </div>
        )}
        <div className="battle-box-case">
          <img src={getCaseImage(case_id)} alt="case" className="battle-box-case__image" />
          <div className="battle-box-case__price">{(123).toPrice()}</div>
        </div>
        {creatorWeapon && (
          <div className="battle-box__weapon battle-box__weapon--opponent">
            <BattleWeapon {...creatorWeapon.item} />
          </div>
        )}
      </div>
      <div className="battle-box__users">
        {/* Creator */}
        {creator && (
          <div className="battle-box-user battle-box-user--creator" onClick={() => BrowserHistory.push("/profile/" + creator.id)}>
            <img src={creator.photo} alt="creator avatar" className="battle-box-user__avatar" />
            <div className="battle-box-user__prize">{creatorWeapon?.item?.price?.toPrice()}</div>
            {winner !== "opponent-win" && (
              <div className="battle-box-user__win-circle">
                <Icon name="trophy" />
              </div>
            )}
            {/* <Link className="ghost" to={"/" + creator.id} /> */}
          </div>
        )}
        {/* Opponent */}
        {opponent && (
          <div className="battle-box-user battle-box-user--opponent battle-box-user--align-right" onClick={() => BrowserHistory.push("/profile/" + opponent.id)}>
            <img src={opponent.photo} alt="creator avatar" className="battle-box-user__avatar" />
            <div className="battle-box-user__prize">{opponentWeapon.item.price.toPrice()}</div>
            {winner !== "creator-win" && (
              <div className="battle-box-user__win-circle">
                <Icon name="trophy" />
              </div>
            )}
            {/* <Link className="ghost" to={String(opponent.id)} /> */}
          </div>
        )}
      </div>
    </div>
  )
}
