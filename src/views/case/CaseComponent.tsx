/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { WeaponDropProps, WeaponItemProps } from "resources/interfaces/weapon"
import { ErrorObject } from "app/components/other/Error"
import Game from "app/components/Standoff/Game"
import { Translate } from "app/controllers/Translation"
import SoundController from "app/controllers/SoundController"
import DataBase from "database"
import { createRandomDrop } from "./CaseHelpers"

type CaseContainerStatus = "waiting" | "running" | "finished"

interface CaseComponentProps {
  id: number
  weapons: WeaponItemProps[]
}

interface CaseComponentState {
  error?: ErrorObject
  loading?: boolean

  status: CaseContainerStatus
  openCount: number
  multiplier: number
  drops: WeaponDropProps[]
}


abstract class CaseComponent extends Game.Component<CaseComponentProps, CaseComponentState> {
  state: CaseComponentState = {
    status: "waiting",
    openCount: 0,
    multiplier: 1,
    drops: []
  }

  case = DataBase.data.Cases[this.props.id] || DataBase.data.Cases[0]
  trans = Translate(trans => trans.views.case)

  componentWillUnmount() {
    SoundController.pause("cases")
    SoundController.pause("getItem")
  }

  reset() {
    this.setState({
      status: "waiting",
      multiplier: 1,
      loading: false,
      error: undefined
    })
  }

  async run() {
    await SoundController.play("cases", true)

    this.setState({
      status: "running",
      loading: false,
      error: undefined,

      drops: this.getDrops()
    })
  }

  async finish() {
    await SoundController.play("getItem")

    this.setState({
      status: "finished",
      loading: false,
      error: undefined,

      drops: this.getDrops()
    })
  }

  getDrops() {
    return [...Array(this.state.multiplier)].map(() => createRandomDrop(this.props.weapons))
  }

  get cost() {
    const price = this.case.price
    const multiplier = this.state.multiplier

    return price * multiplier
  }

  get multiplierOptions() {
    return [1, 2, 3, 4, 5]
  }

  abstract render(): JSX.Element
  abstract renderPreview(): JSX.Element
  abstract renderScrolling(): JSX.Element
  abstract renderFinal(): JSX.Element
}

export default CaseComponent
