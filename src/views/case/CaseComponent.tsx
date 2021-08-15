/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { WeaponDropProps, WeaponItemProps } from "../../resources/interfaces/weapon"
import shuffleArray from "../../resources/utils/shufle"
import Error, { ErrorObject } from "app/components/other/Error"
import Game from "app/components/Standoff/Game"
import { Translate } from "app/controllers/Translation"
import SoundController from "app/controllers/SoundController"
import DataBase from "database"
import { getRandomDrop } from "views/case/CaseHelpers"

type CaseContainerStatus = "waiting" | "running" | "finished"

interface CaseComponentProps {
  id: number
  weapons: WeaponItemProps[]
}

export interface CaseComponentState {
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


abstract class CaseComponent extends Game.Component<CaseComponentProps, CaseComponentState> {
  state: CaseComponentState = {
    status: "waiting",
    openCount: 0,
    multiplier: 1,
    drops: [],
    scrollWeapons: [],
    currentDropIndex: 30
  }

  case = DataBase.data.Cases[this.props.id] || DataBase.data.Cases[0]
  trans = Translate(trans => trans.views.case)

  get totalDropsPrice() {
    if (this.state.drops.length <= 0) {
      return null
    }
    return this.state.drops.reduce((result, drop) => result + drop.item.price, 0)
  }

  componentWillUnmount() {
    SoundController.pause("cases")
    SoundController.pause("getItem")
  }

  wait(callback?: () => void) {
    this.setState({
      status: "waiting",
      multiplier: 1,
      loading: false,
      error: undefined,
      drops: []
    }, callback)

  }

  async run() {
    await SoundController.play("cases", true)

    this.setState({
      status: "running",
      loading: false,
      error: undefined,
    })
  }

  async finish() {
    await SoundController.play("getItem")

    this.setState({
      status: "finished",
      loading: false,
      error: undefined
    })
  }

  loadState(callback?: () => void) {
    const drops = [...Array(this.state.multiplier)].map(_ => getRandomDrop(this.props.weapons))
    this.setState({
      drops,
      scrollWeapons: drops.map(drop => this.shufflePrizeItems(drop.item))
    }, callback)
  }

  open(fast?: boolean) {
    this.setState({ loading: true })
    this.loadState(fast ? this.finish : this.run)
  }



  get cost() {
    const price = this.case.price
    const multiplier = this.state.multiplier

    return price * multiplier
  }


  get multiplierOptions() {
    return [1, 2, 3, 4, 5]
  }


  // Scrolling

  shufflePrizeItems(item: WeaponItemProps) {
    const items: WeaponItemProps[] = []

    if (this.props.weapons) {
      while (items.length <= 50) {
        items.push(...shuffleArray([...this.props.weapons]))
      }
      items.splice(this.state.currentDropIndex, 0, item)
    }

    return items
  }
  getScrollItems(items: WeaponDropProps[]) {
    return items.map(item => this.shufflePrizeItems(item.item))
  }



  abstract render(): JSX.Element
  abstract renderPreview(): JSX.Element
  abstract renderScrolling(): JSX.Element
  abstract renderFinal(): JSX.Element
}

export default CaseComponent
