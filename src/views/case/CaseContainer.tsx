/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// Images
// Staff
import Button from "app/components/UI/Button"
import ButtonTool from "app/components/UI/ButtonTool"
import { ClientAPI } from "app/api/client"
import { getActionT, getCasePage, openCase } from "app/api/actions"
import { WeaponDropProps, WeaponItemProps } from "../../resources/interfaces/weapon"
import shuffleArray from "../../resources/utils/shufle"
import { classWithModifiers, getCaseImage } from "../../resources/utils"
import { GetCasePageRequest } from "app/api/requests"
import Error, { ErrorObject } from "app/components/other/Error"
import CaseScrolling from "./CaseScrolling"
import { User } from "../../resources/interfaces/user"
import { CaseStateFulfilled, CaseStateLimitation, CaseStateCondition } from "./CaseState"
import SelectorPoints from "app/components/UI/SelectorPoints"
import Loader from "app/components/other/Loader"
import Game from "app/components/Standoff/Game"
import { Translate } from "app/controllers/Translation"
import SoundController from "app/controllers/SoundController"
import BrowserHistory from "resources/stores/BrowserHistory"
import { QueryContext } from "app/components/other/MutuableQuery"
import { UseQueryResponse } from "react-fetching-library"
import { UnAuthException, LimitException, InSufficientBalanceException } from "./CaseExceptions"

type CaseContainerStatus = "waiting" | "running" | "finished"

interface CaseContainerProps {
  title?: string
  user: User
  demo: boolean
  setMultiplier: React.Dispatch<React.SetStateAction<number>>
}

export interface CaseContainerState {
  error?: ErrorObject
  loading?: boolean

  status: CaseContainerStatus
  openCount: number
  // indent: string | null
  multiplier: number
  drops: WeaponDropProps[]
  scrollWeapons: Array<WeaponItemProps[]>
  currentDropIndex: number
}


class CaseContainer extends Game.Component<CaseContainerProps, CaseContainerState> {
  state: CaseContainerState = {
    status: "waiting",
    openCount: 0,
    multiplier: 1,
    drops: [],
    scrollWeapons: [],
    currentDropIndex: 30
  }

  trans = Translate(trans => trans.views.case)

  static contextType = QueryContext
  context!: UseQueryResponse<getActionT<ReturnType<typeof getCasePage>>>
  get payload() {
    return this.context.payload as GetCasePageRequest
  }

  get totalDropsPrice() {
    if (this.state.drops.length <= 0) {
      return null
    }
    return this.state.drops.reduce((result, drop) => result + drop.item.price, 0)
  }

  get isFree() {
    if (this.payload.case.price <= 0) {
      return true
    }

    return false
  }

  get isBonus() {
    if (this.payload.case.payForBonus) {
      return true
    }

    return false
  }

  get isSuperBonus() {
    const caseId = this.payload.case.id
    const bonusCase = this.props.user.bonusCase

    if (bonusCase?.enabled && (caseId === bonusCase.case_id)) {
      return true
    }

    return false
  }

  get isExempted() {
    if (this.payload.case.free_count > 0) {
      return true
    }

    return false
  }

  componentDidUpdate() {
    this.props.setMultiplier(this.state.multiplier)

    if (this.props.demo) {
      if (this.isFree || this.isBonus) {
        BrowserHistory.replace("/")
      }
    }
  }

  componentWillUnmount() {
    SoundController.pause("cases")
    SoundController.pause("getItem")
  }

  wait(callback?: () => void) {
    if (this.isFree || this.isExempted) {
      this.context.query()
    }

    this.setState({
      status: "waiting",
      multiplier: 1,
      loading: false,
      error: undefined,
      drops: []
    }, callback)

  }

  async run(callback?: () => void) {
    await SoundController.play("cases", true)

    this.setState({
      status: "running",
      loading: false,
      error: undefined,
    }, callback)
  }

  async finish(callback?: () => void) {
    await SoundController.play("getItem")

    this.setState({
      status: "finished",
      loading: false,
      error: undefined
    }, callback)
  }

  open(fast?: boolean) {
    // If request isn't done less then a second, display loading bar
    const loadingTimeout = setTimeout(() => {
      this.setState(state => state.loading ? state : ({ ...state, loading: true, error: undefined }))
    }, 1000)
    const clearLoadingTimer = () => clearTimeout(loadingTimeout)

    ClientAPI
      .query(openCase(this.payload.case.id, this.state.multiplier, fast, this.props.demo, this.payload.case.price <= 0))
      .then(({ error, payload }) => {
        if (error || !payload) {
          this.setState({ error: payload?.error })
          clearLoadingTimer()
          return
        }

        this.setState({
          drops: [...payload.items], // Here drops are items cuz backer is a dude
          scrollWeapons: this.getScrollItems(payload.items),
          // currentDropIndex: (scrollWeapons.length / 2) + 1,
        })

        clearLoadingTimer()

        fast ? this.finish() : this.run()
      })
  }

  render() {
    const { case: Case } = this.payload

    if (this.state.error) {
      return (
        <div className="case-page">
          <Error {...this.state.error} onClick={() => this.open()} />
        </div>
      )
    }

    if (this.state.loading) {
      return (
        <div className="case-page">
          <Loader />
        </div>
      )
    }

    return (
      <div className="case-page">
        {this.state.status === "waiting" && !this.props.demo && (
          <div className="case-page__sidebar case-page__sidebar--left">
            {Case.Conditions!.length > 0 && Case.Conditions!.every(condition => condition.data.done) && (
              <CaseStateFulfilled />
            )}
            {Case.Conditions?.map(condition => !condition.data.done && (
              <CaseStateCondition {...condition.data} key={condition.id} />
            ))}
          </div>
        )}
        <div className="case-page__content">
          {this.state.status === "waiting" && this.renderPreview()}
          {this.state.status === "running" && this.renderScrolling()}
          {this.state.status === "finished" && this.renderFinal()}
        </div>
        {this.state.status === "waiting" && !this.props.demo && (
          <div className="case-page__sidebar case-page__sidebar--right">
            {Case.limit && <CaseStateLimitation {...Case.limit} value={Case.limit.value + this.state.openCount} />}
          </div>
        )}
      </div>
    )
  }

  get cost() {
    const price = this.payload.case.price
    const freeCount = this.payload.case.free_count
    const multiplier = this.state.multiplier

    return price * (multiplier - freeCount)
  }

  get islimitExceeded() {
    const { limit } = this.payload.case

    if (!limit) return null
    if (limit.value >= limit.limit) return true

    return false
  }

  get multiplierOptions() {
    return [1, 2, 3, 4, 5]
  }

  get balance() {
    const { user, demo } = this.props
    const { payForBonus } = this.payload.case

    if (demo) {
      return user.demo_balance
    }

    if (payForBonus) {
      return user.bonus_balance
    }

    return user.balance
  }

  Exceptions() {
    const { user } = this.props

    if (!user.authed) return <UnAuthException />
    if (this.isExempted) return null

    if (this.payload.case.time > 0) {
      return <LimitException />
    }

    if (this.balance < this.cost) {
      return <InSufficientBalanceException cost={this.cost} />
    }

    return null
  }

  shouldLockPreview() {
    const Case = this.payload.case

    if (this.islimitExceeded) return true
    if (this.balance < this.cost) return true

    if (Case.time > 0 && !Case.free_count) return true
    if (Case.Conditions?.some(condition => !condition.data.done)) {
      return true
    }

    return false
  }

  setMultiplier = (multiplier: number) => this.setState({ multiplier })

  renderPreview() {
    const { user } = this.props
    const Case = this.payload.case
    const { loading } = this.state

    const modifiers: string[] = []

    if (!user.authed) modifiers.push("locked")

    if (this.props.demo) {
      if (user.demo_balance < this.cost) {
        modifiers.push("locked")
      }
    } else {
      if (this.shouldLockPreview()) {
        modifiers.push("locked")
      }
    }

    return (
      <div className="case-page-preview">
        <div className="case-page-preview__preview">
          <img src={getCaseImage(this.payload.case.id)} alt="case" className={classWithModifiers("case-page-preview__image", modifiers)} />
          {modifiers.includes("locked") && (
            <div className="case-page-lock">
              <span className="case-page-lock__icon icon" />
            </div>
          )}
        </div>
        <div className="case-page-preview__buttons">
          <ButtonTool disabled={loading || modifiers.includes("locked")} padding="1.25em" color="yellow" keyPress="Enter" onClick={() => this.open()}>{this.trans.buttons?.open}</ButtonTool>
          {this.cost > 0 && (
            <Button color={this.props.demo ? "orange" : "green"} className="case-page-preview__price" style={{ width: (Case.price * this.multiplierOptions.slice(-1)[0]).toPrice().length * 2 + "ch" }}>{Case.payForBonus ? this.cost + " B" : this.cost.toPrice()}</Button>
          )}
          <ButtonTool disabled={loading || modifiers.includes("locked")} padding="1.25em" color="yellow" keyPress={["f", "а"]} onClick={() => this.open(true)}>{this.trans.buttons?.openFast}</ButtonTool>
        </div>
        {Case.price > 0 && (
          <div className="case-page__multiple">
            <em>{this.trans.multipleText}</em>
            <SelectorPoints
              options={this.multiplierOptions}
              onSelect={this.setMultiplier}
            />
          </div>
        )}
        {this.Exceptions()}
      </div>
    )
  }

  // Scrolling

  shufflePrizeItems(item: WeaponItemProps) {
    const items: WeaponItemProps[] = []

    if (this.payload.items) {
      while (items.length <= 50) {
        items.push(...shuffleArray([...this.payload.items]))
      }
      items.splice(this.state.currentDropIndex, 0, item)
    }

    return items
  }
  getScrollItems(items: WeaponDropProps[]) {
    return items.map(item => this.shufflePrizeItems(item.item))
  }
  renderScrolling() {
    return (
      <CaseScrolling onScrollingEnd={() => this.finish()} {...this.payload} {...this.state} />
    )
  }

  // Final

  sellDrop(id: number) {
    if (this.state.drops.length <= 1) {
      this.wait()
    } else {
      this.setState(state => ({
        drops: state.drops.filter(drop => drop.id !== id),
      }))
    }

  }
  onExit = () => {
    if (this.isSuperBonus) {
      return BrowserHistory.push("/")
    }
    this.wait()
  }
  onSellDrop = (id: number) => {
    if (this.isSuperBonus) {
      return BrowserHistory.push("/")
    }
    this.sellDrop(id)
  }
  renderFinal() {
    return (
      <Game.Final
        drops={this.state.drops}
        onExit={this.onExit}
        onSellDrop={this.onSellDrop}
      />
    )
  }
}

export default CaseContainer
