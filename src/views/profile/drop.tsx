/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// Images
import PNGOpenCaseBlue from "../../assets/images/icons/open-case-blue.png"
import { ReactComponent as SVGChevronsUp } from "../../assets/svg/chevrons-up.svg"
import { ReactComponent as SVGCornerRightUp } from "../../assets/svg/corner-right-up.svg"
import { ReactComponent as SVGFillText } from "../../assets/svg/fill-text.svg"
import { ReactComponent as SVGShield } from "../../assets/svg/shield.svg"
import { ReactComponent as SVGWheel } from "../../assets/svg/wheel.svg"
import { ReactComponent as SVGStar } from "../../assets/svg/star.svg"
// STAFF
import { WeaponComponent } from "../../app/components/Standoff/Weapon"
import { classWithModifiers } from "../../resources/utils"
import Hint from "../../app/components/UI/Hint"
import { WeaponDropProps } from "../../resources/interfaces/weapon"
import Standoff from "../../app/controllers/Standoff"
import Popup from "../../app/controllers/Popup"
import WithdrawPopup from "../../app/components/popup/common/WithdrawPopup"
import Button from "../../app/components/UI/Button"
import ConfirmPopup from "../../app/components/popup/common/ConfirmPopup"
import BrowserHistory from "resources/stores/BrowserHistory"

export type ProfileDropCallbackType = "sold" | "withdrew" | "cancelWithdraw"
export default class ProfileDrop extends WeaponComponent<WeaponDropProps & { callback?: (type: ProfileDropCallbackType, weaponDrop: WeaponDropProps) => void }> {
  sellDrop = () => {
    Popup.open(ConfirmPopup, {
      onSubmit: () => {
        Standoff
          .sell(this.props)
          .then(() => this.props.callback?.("sold", this.props))
      }
    })
  }

  WithdrawDrop = () => {
    Popup.open(WithdrawPopup, {
      weaponDrop: this.props,
      onWithdraw: () => {
        this.props.callback?.("withdrew", this.props)
      }
    })
  }

  CancelWithdraw = () => {
    Popup.open(ConfirmPopup, {
      onSubmit: () => {
        Standoff
          .cancelWithdraw(this.props.id)
          .then(() => this.props.callback?.("cancelWithdraw", this.props))
      }
    })
  }

  renderTop() {
    const item = this.props.item

    const firstIconModifiers: string[] = []
    const secondIconModifiers: string[] = []

    firstIconModifiers.push("locked")

    if (this.props.status === 6) {
      firstIconModifiers.push("yellow")
    }

    if (this.props.status === 7) {
      firstIconModifiers.push("green")
    }

    const WITHDRAW_TYPE = [6, 7].includes(this.props.status)
    const goToReferPage = () => {
      switch (this.props.type) {
        case 1: BrowserHistory.push("/case/" + this.props.case_id); break
        case 2: BrowserHistory.push("/contract"); break
        case 3: BrowserHistory.push("/upgrade"); break
        case 4: BrowserHistory.push("/battles"); break
        case 5: BrowserHistory.push("/wheel"); break
        case 6: BrowserHistory.push("/"); break
        case 7: BrowserHistory.push("/bonuses"); break
      }
    }

    return (
      <div className="weapon-top">
        <div className="weapon-top__info">
          <div className="weapon-top__row">
            <button className={classWithModifiers("weapon-price", [this.props.status === 1 && "green"])} disabled={!this.props.callback || this.props.status > 1} onClick={this.sellDrop}>
              <span className="weapon-price__text">{item.price.toPrice()}</span>
            </button>
            {this.props.callback && (this.props.status === 1) && (
              <Hint y="4.75em" bottom>
                <p>{this.trans.sell}</p>
              </Hint>
            )}
          </div>
          <div className="weapon-top__corner">
            <button className={classWithModifiers("weapon-icon", [...firstIconModifiers, !WITHDRAW_TYPE && "hidden"])} disabled={firstIconModifiers.includes("locked")} onClick={this.sellDrop}>
              <SVGCornerRightUp />
            </button>
            {WITHDRAW_TYPE && (
              <Hint y="4.75em" bottom>
                <p>{this.trans.status?.[this.props.status]}</p>
              </Hint>
            )}
            <div className={classWithModifiers("weapon-icon", [...secondIconModifiers, "status"])} onClick={goToReferPage}>
              {this.props.type === 1 && (
                <img src={PNGOpenCaseBlue} className="icon" />
              )}
              {this.props.type === 2 && <SVGFillText />}
              {this.props.type === 3 && <SVGChevronsUp />}
              {this.props.type === 4 && <SVGShield />}
              {this.props.type === 5 && <SVGWheel />}
              {this.props.type === 6 && <SVGStar />}
              {this.props.type === 7 && <SVGStar />}
            </div>
            <Hint y="4.75em" right bottom>
              <p>{this.trans.type?.[this.props.type]}</p>
            </Hint>
          </div>
        </div>
      </div>
    )
  }

  renderBottom() {
    if (!this.props.callback && [1, 6].includes(this.props.status)) {
      return super.renderBottom()
    }

    return (
      <>
        {super.renderBottom()}
        <div className="weapon-overlap">
          {this.props.status === 1 && (
            <Button className="weapon-overlap__withdraw" onClick={this.WithdrawDrop}>{this.trans.withdraw}</Button>
          )}
          {this.props.status === 6 && (
            <Button className="weapon-overlap__withdraw" onClick={this.CancelWithdraw}>{this.trans.cancelWithdraw}</Button>
          )}
        </div>
      </>
    )
  }
}
