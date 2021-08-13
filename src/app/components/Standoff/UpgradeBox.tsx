/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "assets/scss/components/upgrade-box.scss"
// IMAGES
import { ReactComponent as PlusSVG } from "assets/svg/plus.svg"
import { ReactComponent as ChevronsUpSVG } from "assets/svg/chevrons-up.svg"
// STAFF
import { Component } from "react"
// import { WeaponItemProps } from "../../../resources/interfaces/weapon"
import Icon from "../UI/Icon"
import { classWithModifiers, getWeaponImage } from "resources/utils"
import { WeaponItemProps } from "resources/interfaces/weapon"
import TriangleSVG from "assets/svg/triangle"
import TextOverflow from "../formatting/TextOverflow"
import { UpgradeChanceFormula } from "views/upgrade/UpgradeMaster"

export interface UpgradeProps {
  price: number
  result: number
  upgrade_to: WeaponItemProps
  for_upgrade?: {
    item_id: number
    upgrade_id: number
    item: WeaponItemProps
  }
}

interface UpgradeWeaponProps {
  item?: WeaponItemProps
  balance?: number
  darken?: boolean
  alignRight?: boolean
}
class UpgradeWeapon extends Component<UpgradeWeaponProps> {
  modifiers: any[] = ["transparent", this.props.alignRight && "align-right", this.props.darken && "darken", this.props.item?.class_name?.toLowerCase()]

  renderTop() {
    const item = this.props.item
    return (
      <div className={classWithModifiers("weapon-top", this.modifiers)}>
        <div className="weapon-top__info">
          <div className="weapon-top__row">
            {item ? (
              <div className="weapon-price">
                <span className="weapon-price__text">{item.price.toPrice()}</span>
              </div>
            ) : (
              <div className="weapon-price weapon-price--icon">
                <Icon name="coin" />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const item = this.props.item
    return (
      <div className={classWithModifiers("weapon", this.modifiers)}>
        <div className="weapon__layout">
          {this.renderTop()}
          <div className="weapon-image">
            <div className="weapon-image__triangle">
              <TriangleSVG />
            </div>
            {this.props.balance && (
              <span className="weapon-image__balance">{this.props.balance.toPrice()}</span>
            )}
            {item && (
              <img src={getWeaponImage(item.id)} alt="weapon" className="weapon-image__image" />
            )}
          </div>
          {this.renderBottom()}
        </div>
      </div>
    )
  }

  renderBottom() {
    const item = this.props.item
    return (
      <div className="weapon__bottom">
        <div className={classWithModifiers("weapon__label", this.modifiers)}>
          <span className="weapon__name">{item?.name}</span>
          <TextOverflow className="weapon-subname">{item?.subname || "Баланс"}</TextOverflow>
        </div>
      </div>
    )
  }
}

export default function UpgradeBox(props: UpgradeProps) {
  return (
    <div className="upgrade-box">
      <div className="upgrade-box__weapons">
        <UpgradeWeapon {...props.for_upgrade} balance={props.for_upgrade ? undefined : props.price} />
        <UpgradeWeapon item={props.upgrade_to} darken={!props.result} alignRight />
      </div>
      <div className="upgrade-box__splitter" />
      <div className="upgrade-box-circle">
        <div className={classWithModifiers("upgrade-box-circle__circle", [props.result ? "green" : "red"])}>
          {props.result ? (
            <ChevronsUpSVG className="upgrade-box-circle__icon" />
          ) : (
            <PlusSVG className="upgrade-box-circle__icon upgrade-box-circle__icon--cross" />
          )}
        </div>
        <span className="upgrade-box-circle__text">{UpgradeChanceFormula((props.for_upgrade?.item?.price || props.price), props.upgrade_to?.price || 0).toFixed(2)} %</span>
      </div>
    </div>
  )
}
