/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { PureComponent } from "react"
import { WeaponDropProps, WeaponItemProps } from "resources/interfaces/weapon"
import { classWithModifiers, inter } from "resources/utils"
// SCSS
import "assets/scss/views/upgrade-master.scss"
// Images
import PNGPodium from "assets/images/podium.png"
import { ClientAPI } from "app/api/client"
import { postUpgradeWeapon } from "app/api/actions"
import { connect } from "react-redux"
import { User } from "resources/interfaces/user"
import { ErrorObject } from "app/components/other/Error"
import WeaponImage from "app/components/Standoff/WeaponImage"
import { Translate } from "app/controllers/Translation"
import store from "app/redux/store"
import { addNotify } from "app/redux/reducers/errors-stack"
import SoundController from "app/controllers/SoundController"
import Tumbler from "app/components/UI/Tumbler"
import AuthRequired from "app/components/other/AuthRequired"
import ButtonTool from "app/components/UI/ButtonTool"
import Hint from "app/components/UI/Hint"
import Icon from "app/components/UI/Icon"
import Game from "app/components/Standoff/Game"

type CasePageStatus = "waiting" | "running" | "finished"

interface UpgradeMasterProps {
  user: User
  drop: WeaponDropProps
  weapon: WeaponItemProps
  chance: number
  setChance: React.Dispatch<React.SetStateAction<number>>
}

interface UpgradeMasterState {
  status: CasePageStatus
  error?: ErrorObject
  price: number
  chance: number
  upgradeBy: "id" | "amount"

  item: WeaponDropProps | null
  success?: boolean
  amount?: number
  garant?: number
  winNum?: number
}

export const UpgradeChanceFormula = (a: number, b: number) => a / b * 100

export class UpgradeMaster extends PureComponent<UpgradeMasterProps, UpgradeMasterState> {

  initialState: UpgradeMasterState
  state: UpgradeMasterState = {
    status: "waiting",
    price: 0,
    chance: 0,
    upgradeBy: "amount",
    item: null
  }

  constructor(props: any) {
    super(props)

    this.initialState = {
      ...this.state
    }
  }

  getChance(a: number, b: number) {
    return UpgradeChanceFormula(a, b) + this.props.chance
  }

  componentDidUpdate(prevProps: UpgradeMasterProps) {
    const { drop, weapon } = this.props

    if (drop && weapon) {
      if ((drop !== prevProps.drop) || (weapon !== prevProps.weapon)) {
        const chance = this.getChance(drop.item.price, weapon.price)
        const chanceLimited = chance > 75 ? 75 : chance
        this.setState({
          chance: drop.item.price > weapon.price ? 200 : chanceLimited
        })
      }
    }

    if (drop !== prevProps.drop) {
      this.setUpgradeBy("id")
    }
  }

  componentWillUnmount() {
    SoundController.pause("upgrade")
    SoundController.pause("getItem")
  }

  requestUpgrade(type: "id" | "amount", upgradeWeaponId: number, value: number | number[]) {
    return ClientAPI
      .query(postUpgradeWeapon(upgradeWeaponId, { [type]: value }))
  }

  run() {
    if ((this.state.upgradeBy === "id" ? this.props.drop : this.state.price) && this.props.weapon) {
      this
        .requestUpgrade(this.state.upgradeBy, this.props.weapon.id, this.state.upgradeBy === "amount" ? (this.state.price || 0) : this.props?.drop?.id || 0)
        .then(({ error, payload }) => {
          if (error || !payload) return
          // SoundController.play("upgrade")?.then(() => {
          this.setState({
            status: "running",
            ...payload
          })
          // })
        })
      this.props.setChance(0)
    }
  }

  async finish() {
    // await  SoundController.play("getItem")

    this.setStatus("finished")

    if (this.state.garant) {
      store.dispatch(
        addNotify("youGotPrize", undefined, this.state.garant.toPrice())
      )
      store.dispatch({
        type: "USER_INFO_UPDATE",
        payload: {
          balance: this.props.user.balance + this.state.garant
        }
      })
    }
  }

  setStatus(status: CasePageStatus) {
    this.setState({ status })
  }

  reset() {
    this.setState(this.initialState)
    store.dispatch({
      type: "UPDATE/CLEAR"
    })
  }

  get weaponError() {
    if (!this.props.drop) {
      return this.trans.chooseSkin1 || null
    }

    if (!this.props.weapon) {
      return this.trans.chooseSkin2 || null
    }

    return null
  }

  setUpgradeBy(upgradeBy: UpgradeMasterState["upgradeBy"]) {
    this.setState({
      upgradeBy
    })
  }

  rangeInput(event: any) {
    let price = +event.target.value
    if (price < 10) price = 10

    const chance = this.getChance(price, (this.props.weapon?.price || 0))
    if (chance > 75) return

    this.setState({ price, chance })
  }

  trans = Translate(trans => trans.views.upgrade)

  render() {
    if (this.state.status === "finished" && !this.state.garant) {
      return (
        <div className="upgrade-final">
          {this.renderFinal()}
        </div>
      )
    }
    const price = this.props.drop?.item?.price || this.state.price
    return (
      <div className="upgrade">
        <div className="upgrade__container">
          {this.renderUpgradeFrom()}
          {this.renderCircle()}
          <UpgradeWeapon
            title={this.trans.youTake || ""}
            error={this.weaponError}
            weapon={this.props.weapon}
          />
        </div>
        <div className="upgrade__bottom">
          <div className="upgrade__bonus-chance" hidden={!this.props.chance}>
            {inter(this.trans.bonusChance, { chance: this.props.chance })}
          </div>
          <div className="upgrade__info">
            {inter(this.trans.grantedPrize, { price1: (price * 0.05).toPrice(), price2: (price * 0.12).toPrice() })}
          </div>
          <Tumbler {...this.trans.toggle} value={Number(this.state.upgradeBy === "id")} onChange={value => this.setUpgradeBy(value ? "id" : "amount")} />
          <AuthRequired onlyButton>
            <ButtonTool type="magic" color="yellow" disabled={this.state.status === "running"} onClick={() => this.state.status === "finished" ? this.reset() : this.run()}>{this.state.status === "waiting" ? this.trans.submit : this.trans.tryAgain}</ButtonTool>
          </AuthRequired>
        </div>
      </div>
    )
  }

  renderUpgradeFrom() {
    if (this.state.upgradeBy === "amount") {
      const { user, weapon } = this.props
      const { price } = this.state
      const wprice = (weapon?.price || 0) * 0.75

      return (
        <div>
          <UpgradeWeapon
            title={this.trans.youGive || ""}
            filler={this.state.upgradeBy === "amount" ? ((this.trans.maxPrice + " ") + (10).toPrice()) : this.trans.empty}
            error={this.weaponError}
          />
          <div className="balance-range">
            <div className="balance-range__title">{price.toPrice()}</div>
            <input type="range" className="balance-range__input" min={0} max={wprice > user.balance ? user.balance : wprice} step="0.01" value={this.state.price} onInput={e => this.rangeInput(e)} />
            {!wprice && (
              <Hint y="1.5em">
                <p>{this.trans.chooseSkin1}</p>
              </Hint>
            )}
          </div>
        </div>
      )
    }

    return (
      <UpgradeWeapon title={this.trans.youGive || ""} error={this.weaponError} weapon={this.props.drop?.item} />
    )
  }

  renderCircle() {
    const { status, chance, winNum } = this.state
    if (this.state.status === "finished" && this.state.garant) {
      return this.renderLose()
    }
    return (
      <div className={classWithModifiers("upgrade-circle", [status, chance >= 50 ? "half" : null])} style={{ "--circle-filled": chance, "--circle-pos": winNum }}>
        <div className="upgrade-circle__left"></div>
        <div className="upgrade-circle__right"></div>
        <div className="upgrade-circle__inner">
          <div className={classWithModifiers("upgrade-circle__arrow", [status])} onTransitionEnd={() => this.finish()} />
          <div className="upgrade-circle__chance">{chance.toFixed(1)}%</div>
          <div className="upgrade-circle__text">{this.trans.circleText}</div>
        </div>
      </div>
    )
  }

  renderLose() {
    return (
      <div className="upgrade-circle upgrade-circle--lose">
        <div className="upgrade-circle__inner">
          <div className="upgrade-circle__cross">
            <Icon name="cross" />
          </div>
          <div className="upgrade-circle__text">
            <em>{this.trans.circleTextLose}</em>
          </div>
        </div>
      </div>
    )
  }

  renderFinal() {
    if (!this.state.item) {
      return null
    }

    const wait = () => this.reset()

    return (
      <Game.Final
        drops={[this.state.item]}
        onSellDrop={wait}
        onExit={wait}
        hint={!this.state.success && this.trans.garant}
      />
    )
  }
}

function UpgradeWeapon({ title, weapon, error, filler = "Пусто..." }: { title: string, weapon?: WeaponItemProps, error: string | null; filler?: string }) {
  return (
    <div className="upgrade-weapon">
      <div className="upgrade-weapon__title">{title} {weapon?.price?.toPrice()}</div>
      <div className="upgrade-weapon__container">
        <img src={PNGPodium} alt="upgrade podium" className="upgrade-weapon__podium" />
        <div className="upgrade-weapon__image">
          <WeaponImage {...weapon} disabled={!weapon} />
        </div>
        <div className={classWithModifiers("upgrade-weapon__name", [weapon?.name && "filled"])}>{weapon?.name || filler}</div>
      </div>
      <p className="upgrade-weapon__text">{error}</p>
    </div>
  )
}

export default connect(state => ({ ...state.upgrade, user: state.user }))(UpgradeMaster)
