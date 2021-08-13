/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { PureComponent } from "react"

type TaskComponentStatus = "waiting" | "running" | "finished"

interface TaskComponentState {
  status: TaskComponentStatus
}

abstract class TaskComponent<P = any, S = any> extends PureComponent<P, S | TaskComponentState> {

  public state: S | TaskComponentState = {
    status: "waiting"
  }

  private initialState: S | TaskComponentState

  public constructor(props: any) {
    super(props)

    this.initialState = { ...this.state }
  }

  public setStatus(status: TaskComponentStatus) {
    this.setState({ status })
  }

  public reset() {
    this.setState(this.initialState)
  }

  public wait() {
    this.setStatus("waiting")
    this.onWaiting()
  }

  public run() {
    this.setStatus("running")
    this.onRunning()
  }

  public finish() {
    this.setStatus("finished")
    this.onFinished()
  }

  public onWaiting(): void {}
  public onRunning(): void {}
  public onFinished(): void {}
}

export default TaskComponent
