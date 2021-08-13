/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../../assets/scss/components/weapon.scss"
// STAFF
import Button from "../UI/Button"
import { memo, PureComponent } from "react"
import { WeaponDropProps, WeaponItemProps } from "../../../resources/interfaces/weapon"
import { classWithModifiers } from "../../../resources/utils"
import TriangleSVG from "../../../assets/svg/triangle"
import TextOverflow from "../formatting/TextOverflow"
import WeaponImage from "./WeaponImage"
import { Translate } from "app/controllers/Translation"

// const SVGTriangle = memo(TriangleSVG)

type WeaponPropsRequireItemOnly = Partial<Omit<WeaponDropProps, "item">> & Pick<WeaponDropProps, "item">

export interface WeaponAbstractProps extends WeaponPropsRequireItemOnly {
  priceColor?: "green" | "red" | null
}

export class WeaponComponent<P = {}, S = {}, SS = {}> extends PureComponent<WeaponAbstractProps & P, S, SS> {
  modifiers: Array<string | null | undefined> = []
  trans = Translate(trans => trans.general.case)

  get trianglesCount() {
    return trianglesCount(this.props.item.class_name)
  }

  renderTop() {
    const item = this.props.item
    return (
      <div className="weapon-top">
        <div className="weapon-top__info">
          <div className="weapon-top__row">
            <div className={classWithModifiers("weapon-price", this.modifiers)}>
              <span className="weapon-price__text">{item.price.toPrice()}</span>
            </div>
          </div>
        </div>
        {/* {this.status && <span className={classWithModifiers("weapon__status", this.modifiers)}>{this.status}</span>} */}
      </div>
    )
  }

  render() {
    const item = this.props.item

    this.modifiers.push(this.props.priceColor) // Price color
    this.modifiers.push(item.class_name.toLowerCase()) // Rariry

    return (
      <div className={classWithModifiers("weapon", this.modifiers)}>
        <div className="weapon__layout">
          {this.renderTop()}
          <WeaponImage {...this.props.item}>
            <a className="ghost" rel="noreferrer noopener" target="_blank" href="https://standoffmarket.ru/" />
          </WeaponImage>
          {this.renderBottom()}
        </div>
      </div>
    )
  }


  renderBottom() {
    const item = this.props.item
    return (
      <div className="weapon__bottom">
        <div className="weapon__label">
          <TextOverflow className="weapon__name">{(item.StatTrack ? "StatTrack " : "") + item.name}</TextOverflow>
          <TextOverflow className="weapon-subname">{item.subname}</TextOverflow>
        </div>
        <div className="weapon__rarity">
          {this.renderTriangles()}
        </div>
      </div>
    )
  }

  renderTriangles() {
    return (
      [...Array(this.trianglesCount)].map((_, index) => (
        <TriangleSVG key={"TriangleSVG_" + index} />
      ))
    )
  }
}

export interface WeaponComponentProps {
  action?: [string, (weapon: WeaponDropProps & WeaponPropsRequireItemOnly) => void]
}

class Weapon extends WeaponComponent<WeaponComponentProps> {
  renderTop() {
    const item = this.props.item
    // const [actionName, actionCallback] = this.props.action || ["", () => { }]
    const actionName = this.props.action?.[0] || ""
    const actionCallback = this.props.action?.[1] || (() => { })

    if (this.props.action) {
      this.modifiers.push("green")
      this.modifiers.push("right-coll")
    }

    return (
      <div className="weapon-top">
        <div className="weapon-top__info">
          <div className="weapon-top__row">
            <div className={classWithModifiers("weapon-price", this.modifiers)}>
              <span className="weapon-price__text">{item.price.toPrice()}</span>
            </div>
            {this.props.action && (
              <Button className="button--left-coll weapon-top__sell" onClick={() => actionCallback(this.props as any)}>{actionName}</Button>
            )}
          </div>
        </div>
        {/* {this.status && <span className={classWithModifiers("weapon__status", this.modifiers)}>{this.status}</span>} */}
      </div>
    )
  }
}

export type WeaponProps = Weapon["props"]

/**
* @returns a number which determines triangles rarity
*/
export function trianglesCount(weaponRarity: WeaponItemProps["class_name"]) {
  switch (weaponRarity.toLowerCase()) {
    case "common":
    case "uncommon":
      return 1

    case "rare":
    case "epic":
      return 2

    case "legendary":
    case "arcane":
      return 3

    default:
      return 0
  }
}

export default memo(Weapon)
