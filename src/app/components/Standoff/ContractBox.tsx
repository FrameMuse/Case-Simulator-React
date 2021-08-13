/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../../assets/scss/components/contract-box.scss"
// STAFF
import { WeaponItemProps } from "../../../resources/interfaces/weapon"
import { classWithModifiers, getWeaponImage } from "resources/utils"
import { Component } from "react"
import TextOverflow from "../formatting/TextOverflow"

export interface ContractBoxProps {
  item: WeaponItemProps
  price: number
  weaponList: Array<{
    contract_id: number
    item: WeaponItemProps
    item_id: number
  }>
}

class ContractBox extends Component<ContractBoxProps> {
  render() {
    return (
      <div className={classWithModifiers("contract-box", [this.props.item.class_name.toLowerCase()])}>
        {this.renderHeader()}
        <div className="contract-box__container">
          {this.renderWeaponList()}
          {this.renderBottom()}
        </div>
      </div>
    )
  }

  renderHeader() {
    return (
      <div className="contract-box-header">
        <div className="contract-box-header__left">
          <div className="contract-box-header__name">
            <span className="contract-box-header__name--0">{this.props.item.name}</span>
            <TextOverflow className="contract-box-header__name--1">{this.props.item.subname}</TextOverflow>
          </div>
        </div>
        <div className="contract-box-header__image">
          <div className="contract-box-header__rarity" />
          <img src={getWeaponImage(this.props.item.id)} alt="weapon" className="contract-box-header__weapon-image" />
        </div>
        <div className="contract-box-header__right">
          <div className="contract-box-header__price">{this.props.item.price.toPrice()}</div>
        </div>
      </div>
    )
  }

  renderWeaponList() {
    return (
      <div className="contract-box-list">
        {this.props.weaponList.map((weapon, index) => (
          <div className="contract-box-list__weapon" key={"contract_weapon_" + index}>
            <img src={getWeaponImage(weapon.item.id)} alt="weapon" className="contract-box-list__weapon-image" key={"weapon_" + index} />
            <div className="contract-box-hint">
              <div className="contract-box-hint__text">{weapon.item.name} - {weapon.item.subname}</div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  renderBottom() {
    return (
      <div className="contract-box__bottom">
        <p className="contract-box__text">
          Стоимость контракта <em>{this.props.price.toPrice()}</em>
        </p>
      </div>
    )
  }
}

export default ContractBox
