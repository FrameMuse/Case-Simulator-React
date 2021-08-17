/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../assets/scss/views/battle.scss"
// IMAGES
import VSLogo from "../../assets/images/vs1.png"
// STAFF
import { PureComponent } from "react"
import { User } from "../../resources/interfaces/user"
import { getCaseImage, inter } from "../../resources/utils"
import BattleUser from "./BattleUser"
import { Translate } from "app/controllers/Translation"
import Button from "app/components/UI/Button"
import ClientSocket from "app/socket/ClientSocket"
import { WeaponDropProps, WeaponItemProps } from "../../resources/interfaces/weapon"
import { ClientAPI } from "app/api/client"
import { fetchBattleCancel, postSellItem } from "app/api/actions"
import shuffleArray from "../../resources/utils/shufle"
import Error, { ErrorObject } from "app/components/other/Error"
import { connect } from "react-redux"
import Weapon from "app/components/Standoff/Weapon"
import BrowserHistory from "resources/stores/BrowserHistory"
import Game from "app/components/Standoff/Game"
import store from "app/redux/store"
import { addNotify } from "app/redux/reducers/errors-stack"
import SoundController from "app/controllers/SoundController"

type BattleStatus = "searching" | "running" | "finish"
export type BattleWinner = "host" | "opponent" | "draw"
export type BattleUser = Pick<User, "id" | "photo" | "firstname" | "lastname" | "lvl">

export interface BattleJoin {
  id: number
  status: number
  garant: number
  owner: BattleUser
  ownerDrop: WeaponDropProps
  opponentDrop?: WeaponDropProps
  opponent?: BattleUser
}
export interface BattleResponse extends BattleJoin {
  case: {
    id: number
    price: number
  }
}
interface BattleProps {
  user: User
  battle: BattleResponse
  items: Array<WeaponItemProps>
  referred?: boolean
}
export interface BattleState extends Pick<BattleJoin, "ownerDrop" | "opponentDrop" | "opponent"> {
  error?: ErrorObject
  status: BattleStatus
  winner: BattleWinner | null
  garant: number

  referred?: boolean
  soldHost?: boolean
  soldOpponent?: boolean
  soldAll?: boolean
}

class Battle extends PureComponent<BattleProps, BattleState> {
  state: BattleState = {
    ...this.props.battle,
    status: "searching",
    winner: null,
    garant: 0,
    referred: this.props.referred
  }

  deleteReferrer() {
    BrowserHistory.replace({
      ...BrowserHistory.location,
      state: {
        ...BrowserHistory.location.state as any,
        referred: false
      }
    })
  }

  handleJoinEvent = (payload: BattleJoin) => {
    this.handleJoin(payload)
  }

  componentDidMount() {
    if (this.props.battle.opponent) {
      this.handleJoin(this.props.battle)
    } else {
      ClientSocket.add("BATTLES_JOIN", this.handleJoinEvent)
    }
    // No referrer on page update
    this.deleteReferrer()
  }
  componentWillUnmount() {
    ClientSocket.delete("BATTLES_JOIN", this.handleJoinEvent)

    SoundController.pause("rouletteBattle")
    SoundController.pause("getItemBattle")
  }

  getWinner(status: number): BattleWinner {
    switch (status) {
      case 1:
        return "host"

      case 2:
        return "opponent"

      case 3:
      default:
        return "draw"
    }
  }

  async handleJoin(payload: BattleJoin) {
    const { battle } = this.props

    if (battle.id === payload.id) {
      // await SoundController.play("rouletteBattle")

      this.setState({
        ...payload,
        status: "running",
        winner: this.getWinner(payload.status),
        soldHost: payload.ownerDrop.status !== 1,
        soldOpponent: payload.opponentDrop?.status !== 1,
      })
    }
  }

  getScrollingItems(item: WeaponItemProps): WeaponItemProps[] {
    return [
      ...shuffleArray(this.props.items),
      item,
      ...shuffleArray(this.props.items)
    ]
  }

  get myId() {
    return this.props.user.id
  }

  get amHost() {
    return this.myId === this.props.battle.owner.id
  }

  get amOpponent() {
    return this.myId === this.state?.opponent?.id
  }

  /**
   * True means win
   * 
   * False means lose
   * 
   * Null means a draw
   * @returns Either (true, false) or null
   */
  get didIWin() {
    const { winner } = this.state

    if (this.amHost && winner === "host") {
      return true
    }

    if (this.amOpponent && winner === "opponent") {
      return true
    }

    if (winner === "draw") {
      return null
    }

    return false
  }

  sellItem(id: number) {
    return ClientAPI.query(postSellItem([id], "ids"))
  }

  sellAllItems() {
    const { ownerDrop, opponentDrop } = this.state

    if (ownerDrop && opponentDrop) {
      ClientAPI
        .query(postSellItem([ownerDrop.id, opponentDrop.id], "ids"))
        .then(() => this.setState({ soldAll: true }))
    }
  }

  render() {
    if (this.state.error) {
      return <Error {...this.state.error} />
    }

    return (
      <div className="battle__container">
        {this.renderTop()}
        {this.renderContent()}
        {this.renderBottom()}
      </div>
    )
  }

  renderTop() {
    const { id, price } = this.props.battle.case
    return (
      <div className="battle-top">
        <div className="battle-top__left">
          <BattleUser type="host" user={this.props.battle.owner} {...this.state} />
        </div>
        <div className="battle-top__logo">
          <div className="battle-top__pieces" />
          <img src={VSLogo} alt="versus logo" className="battle-top__vs-logo" />
          <div className="battle-top-case">
            <img src={getCaseImage(id)} alt="weapon" className="battle-top-case__image" />
            <div className="battle-top-case__price">{price.toPrice()}</div>
          </div>
        </div>
        <div className="battle-top__right">
          <BattleUser type="opponent" user={this.state.opponent} {...this.state} />
        </div>
      </div>
    )
  }
  cancelBattle = () => {
    ClientAPI
      .query(fetchBattleCancel(this.props.battle.id))
      .then(({ error }) => {
        if (error) return
        BrowserHistory.push("/battles")
      })
  }
  renderBottom() {
    const { status, soldHost, soldOpponent, soldAll } = this.state

    const battle = Translate(trans => trans.views.battle)
    const cases = Translate(trans => trans.cases)
    const caseId = this.props.battle.case.id as unknown as keyof typeof cases
    const casePrice = this.props.battle.case.price
    return (
      <div className="battle-bottom">
        {/* <div className="battle-bottom-info">
          <div className="battle-bottom-info__title">{caseTranslation?.title}</div>
          <p className="battle-bottom-info__text">
            {battle.bottom?.text} {caseTranslation?.title}
          </p>
        </div> */}
        <div>
          <Game.FinalInfo />
          <div className="battle-bottom__info">{inter(battle.bottom?.grantedPrize, { price1: (casePrice * 0.025).toPrice(), price2: (casePrice * 0.05).toPrice() })}</div>
        </div>
        <div className="battle-bottom__buttons">
          {status === "searching" && (
            <Button className="battle-bottom__button" onClick={this.cancelBattle}>{battle.bottom?.buttons?.cancel}</Button>
          )}
          {status === "finish" && (this.didIWin ?? true) && ((!soldHost || !soldOpponent) && !soldAll) && (
            <Button className="battle-bottom__button" color="yellow" onClick={() => this.sellAllItems()}>{battle.bottom?.buttons?.sellAll}</Button>
          )}
          {status === "finish" && (
            <Button className="battle-bottom__button" onClick={() => BrowserHistory.push("/battles")}>{battle.bottom?.buttons?.again}</Button>
          )}
        </div>
      </div>
    )
  }
  renderContent() {
    switch (this.state.status) {
      case "searching":
        return (
          <div className="battle-content">
            <div className="battle-content__scrolling">
              {this.renderSkeletonScrolling()}
            </div>
            <div className="battle-content__splitter" />
            <div className="battle-content__scrolling">
              {this.renderSkeletonScrolling()}
            </div>
          </div>
        )

      case "running":
        return (
          <div className="battle-content">
            <div className="battle-content__scrolling">
              {this.renderOwner()}
            </div>
            <div className="battle-content__splitter" />
            <div className="battle-content__scrolling">
              {this.renderOpponent()}
            </div>
          </div>
        )

      case "finish":
        return this.renderFinal()

      default:
        return <Error message="Неизвестная ошибка: 69" />
    }
  }

  get suffledItems() {
    const items: WeaponItemProps[] = []

    if (this.props.items) {
      while (items.length < 25) {
        items.push(...shuffleArray(this.props.items))
      }
    }

    return items
  }

  renderSkeletonScrolling() {
    const scrollFormula = (count: number) => (count * 17) + (count * 2.5)
    return (
      <div className="case-page-scroll" style={{ "--weapon-scroll-x": "-" + scrollFormula(this.suffledItems.length) + "em" }}>
        <div className="case-page-scroll__section">
          <div className="case-page-scroll__inner case-page-scroll__inner--animation" style={{ animationDuration: "100s" }}>
            {this.suffledItems.map((item, index) => (
              <Weapon key={"case-page-scroll_" + index} item={item} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  renderFinal() {
    const { ownerDrop, opponentDrop, soldHost, soldOpponent, soldAll, winner } = this.state

    if (!ownerDrop || !opponentDrop) {
      return <Error code={68} />
    }

    const sellHostItem = () => {
      this.setState({
        soldHost: true
      })
    }

    const sellOpponentItem = () => {
      this.setState({
        soldOpponent: true
      })
    }

    return (
      <div className="battle-content">
        <div className="game-final-drop__smoke" />
        <div className="battle-content__final">
          <Game.FinalDropsContainer disableButtons={!(this.didIWin ?? false) || soldHost || soldAll} drops={[ownerDrop]} onSellDrop={sellHostItem} onExit={sellHostItem} />
        </div>
        <div className="battle-content__final">
          <Game.FinalDropsContainer disableButtons={!(this.didIWin ?? false) || soldOpponent || soldAll} drops={[opponentDrop]} onSellDrop={sellOpponentItem} onExit={sellOpponentItem} />
        </div>
      </div>
    )
  }

  async finish() {
    // alert("end")
    this.setState({
      status: "finish",
      // soldHost: false,
      // soldOpponent: false
    })

    // SoundController.play("getItemBattle")


    if (!this.didIWin && this.state.referred && this.state.garant) {
      store.dispatch({
        type: "USER_INFO_UPDATE",
        payload: {
          balance: this.props.user.balance + this.state.garant
        }
      })

      store.dispatch(addNotify("youGotPrize", undefined, this.state.garant.toPrice()))
    }


    if (process.env.NODE_ENV === "development") {
      console.log("==================================== penis")
      console.table([["My Id", "Am Host?", "Am Opponent?", "Did I win?", "Winner", "p"], [this.myId, this.amHost, this.amOpponent, this.didIWin, this.state.winner, "penis"]])
      console.log("==================================== penis", this.state)
    }
  }

  renderOwner() {
    if (this.state.ownerDrop) {
      const item = this.state.ownerDrop.item
      const items = this.getScrollingItems(item)
      return null
      // return <CaseScrolling currentDropIndex={items.indexOf(item)} onScrollingEnd={() => this.finish()} weaponItems={[items]} />
    }

    return <Error message="Неизвестная ошибка: 66" />
  }
  renderOpponent() {
    if (this.state.opponentDrop) {
      const item = this.state.opponentDrop.item
      const items = this.getScrollingItems(item)
      return null
      // return <CaseScrolling currentDropIndex={items.indexOf(item)} onScrollingEnd={() => this.finish()} weaponItems={[items]} />
    }

    return <Error message="Неизвестная ошибка: 67" />
  }
}

export default connect(state => ({ user: state.user }))(Battle)
