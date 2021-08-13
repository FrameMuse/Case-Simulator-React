/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// Wheel Images
import WheelPodium from "../../assets/images/podium.png"
// SVG
import { ReactComponent as SVGTriangleTop } from "../../assets/svg/wheel-triangle-top.svg"
import { ReactComponent as SVGTriangleBottom } from "../../assets/svg/wheel-triangle-bottom.svg"
// STAFF
import { PureComponent, useEffect, useState } from "react"
import { classWithModifiers, delay, getBonusImage, inter } from "../../resources/utils"
import { ClientAPI } from "../../app/api/client"
import { fetchWheelItems, fetchWheelSpin } from "../../app/api/actions"
import Button from "../../app/components/UI/Button"
import { Ttrace } from "../../resources/utils/trace"
import SoundController from "app/controllers/SoundController"
import { TimerCountDown } from "app/components/UI/Timer"
import useTranslation from "resources/hooks/useTranslation"
import Standoff from "app/controllers/Standoff"
import { Translate } from "app/controllers/Translation"
import BrowserHistory from "resources/stores/BrowserHistory"
import { QueryContext, QueryContextResponse } from "app/components/other/MutuableQuery"
import AuthRequired from "app/components/other/AuthRequired"
import { connect } from "react-redux"
import { User } from "resources/interfaces/user"

export type WheelPageStatus = "waiting" | "running" | "finished"

interface WheelPageProps {
  title: string
  user: User
}

interface WheelPageState {
  status: WheelPageStatus
  winBonusId: number | null
  currentInterTriangle: number | null
}

abstract class WheelTemplate extends PureComponent<Partial<WheelPageProps>, WheelPageState> {
  abstract run(): void
  abstract reset(): void

  static contextType = QueryContext
  context!: QueryContextResponse<typeof fetchWheelItems>

  trans = Translate(trans => trans.views.wheel)

  get items() {
    return this.context?.payload?.wheel || []
  }

  get indexOfWinBonus() {
    if (!this.state.winBonusId) {
      throw new Error("winBonusId is null")
    }
    return this.items.indexOf(this.state.winBonusId)
  }

  useBonus() {
    if (!this.state.winBonusId) return

    if (this.state.winBonusId === 14) {
      Standoff.activateBonus({ item_id: this.state.winBonusId, item: { condition: 0 }, status: 0 })
      return
    }

    BrowserHistory.push("/profile/bonuses")

    // Standoff
    //   .activateBonus(this.state.winBonusId)
    //   .then(() => this.reset())
  }

  render() {
    const { status } = this.state

    if (status === "finished") {
      return this.renderFinished()
    }

    return (
      <div className="wheel-container">
        <div className="wheel-site">
          <img src={WheelPodium} alt="wheel podium" className="wheel-site__podium" />
          {this.renderSite()}
          {this.renderBonuses()}
        </div>
        <div className="wheel-container__bottom">
          <AuthRequired onlyButton>
            {Boolean(this.context?.payload?.time) && !this.props.user?.wheelCount ? (
              <TimerCountDown distance={this.context!.payload!.time} />
            ) : (
              <Button
                // className="wheel-container__button"
                color="yellow"
                padding="2em 7.5em"
                disabled={status === "running"}
                children={this.trans.spinWheel}
                onClick={() => status === "waiting" ? this.run() : this.reset()}
              />
            )}
          </AuthRequired>
        </div>
      </div>
    )
  }
  renderSite() {
    const { status, currentInterTriangle } = this.state
    const layout = [
      SVGTriangleTop,
      SVGTriangleBottom,
      SVGTriangleTop,
      SVGTriangleBottom,
      SVGTriangleTop,
      SVGTriangleBottom
    ]
    return (
      <div className="wheel-site__inner">
        {layout.map((SVGTriangle, index) => {
          const modifiers: Array<string | number> = []

          // modifiers.push(index)

          if (currentInterTriangle === index) {
            if (status === "finished") {
              modifiers.push("final")
            } else {
              modifiers.push("inter")
            }
          }

          return (
            <SVGTriangle key={index} className={classWithModifiers("wheel-site__triangle", modifiers)} />
          )
        })}
      </div>
    )
  }

  renderBonuses() {
    return (
      <div className="wheel-bonuses">
        {this.items.map((bonusId, index) => (
          <OriententionalImg src={getBonusImage(bonusId)} alt="bonus" className="wheel-bonuses__bonus" key={"bonus_" + index} />
        ))}
      </div>
    )
  }
  renderFinished() {
    if (!this.state.winBonusId) return null
    const bonuses = Translate(trans => trans.bonuses.list)
    return (
      <div className="wheel-container">
        <div className="wheel-finish">
          <div className="wheel-finish__sidebar">
            <div className="wheel-finish__warnings">
              <WarningBox>
                {inter(this.trans.warning1)}
              </WarningBox>
              <WarningBox>
                {this.trans.warning2}
              </WarningBox>
            </div>
          </div>
          <div className="wheel-finish__content">
            <div className="wheel-finish-bonus">
              <img src={getBonusImage(this.state.winBonusId || -1)} alt="bonus" className="wheel-finish-bonus__image" />
              <div className="wheel-finish-bonus__title">{bonuses[this.state.winBonusId]?.title}</div>
            </div>
            <div className="wheel-finish__buttons">
              <Button padding="1.5em 4em" onClick={() => this.reset()}>{this.trans.resetWheel}</Button>
              <Button padding="1.5em 4em" color="yellow" onClick={() => this.useBonus()}>{this.trans.useBonus}</Button>
            </div>
          </div>
          <div className="wheel-finish__sidebar">
            <div className="wheel-finish__terms">
              <h3>{this.trans.terms}</h3>
              <BonusTerms id={this.state.winBonusId} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function BonusTerms({ id }: { id: number }) {
  const bonuses = useTranslation(trans => trans.bonuses)
  const bonus = bonuses.list?.[id]
  return (
    // <div className="detail-bonus-terms">
    <div className="detail-bonus-terms__list">
      {bonus?.hints?.map((hint, index) => (
        <li className="detail-bonus-terms__term" key={"hint_" + index}>{hint}</li>
      ))}
    </div>
    // </div>
  )
}

function WarningBox(props: { children: any }) {
  return (
    <div className="warning-box">
      {/* <div className="warning-box__circle">
            <div className="warning-box__i">!</div>
          </div> */}
      <p className="warning-box__text">{props.children}</p>
    </div>
  )
}

class WheelPage extends WheelTemplate {

  initialState: WheelPageState = {
    status: "waiting",
    winBonusId: null,
    currentInterTriangle: null
  }

  settings = {
    iterations: 5 * 25,
    baseDelay: 50,
    cubicBezier: [0, 0, 0, 2],
    speedSet: {
      0: 75,
      // 15: 75,
      30: 50,
      60: 25,
      90: 10,
      95: 5,
    } as Record<number, number>
  }

  constructor(props: any) {
    super(props)

    this.state = {
      ...this.state,
      ...this.initialState
    }
  }

  componentWillUnmount() {
    SoundController.pause("roulette")
    SoundController.pause("wheelItem")
  }

  setStatus(status: WheelPageStatus) {
    Ttrace("Popup", () => {

      this.setState({ status })
    })
  }

  reset() {
    this.setState(this.initialState)
    this.context?.query()
  }

  run() {
    ClientAPI
      .query(fetchWheelSpin(1))
      .then(({ error, payload }) => {
        if (error || !payload) return

        this.setState({
          status: "running",
          winBonusId: payload.id
        })

        SoundController.play("roulette", true)
        this.animateWheelSite(() => {
          this.nextTriangle()
        }).then(async () => {
          await delay(1000)
          this.setStatus("finished")
          this.context.modifyPayload({
            ...this.context.payload,
            countBonuses: this.context.payload.countBonuses + 1
          })
          SoundController.play("wheelItem")
        })
      })
  }

  nextTriangle() {
    let currentInterTriangle = this.state.currentInterTriangle || 0

    if (currentInterTriangle > 4) {
      currentInterTriangle = 0
    } else {
      currentInterTriangle++
    }

    this.setState({ currentInterTriangle })
  }

  buildSpeedSet() {
    // function reduce(value: number) {
    //   return value - 1
    // }

    let lastSeenSpeed = this.settings.speedSet[0]
    for (let progress = 0; progress <= 100; progress++) {
      const speed = this.settings.speedSet[progress]
      if (speed >= 0) {
        lastSeenSpeed = speed
        continue
      }

      // const speedCoef = progress / lastSeenSpeed
      // if (speedCoef < 0.75) {
      //   this.settings.speedSet[progress] = lastSeenSpeed * speedCoef
      //   continue
      // }

      this.settings.speedSet[progress] = lastSeenSpeed
    }
  }

  animateWheelSite(callback: (iteration: number) => void) {
    // const ease = (t: number) => (1 + Math.sin(Math.PI*(2*t - 1))) / 2
    // const ease = (t: number) => 3*t**2 - 2*t**3
    // const ease = (t: number, ...[a, c, b, d]: number[]) => a*t**3 + b*t**2 + c*t + d
    // const ease = (t: number) => 1/t
    // const ease = (s = 1, t: number, ...[P1, P2, P3, P4]: number[]) => (s - t) ** 3 * P1 + 3 * (s - t) ** 2 * t * P2 + (3 * (s - t) * t ** 2 * P3) + (t ** 3 * P4)

    this.buildSpeedSet()

    return new Promise<void>((resolve => {
      const { iterations: baseIterations, speedSet, baseDelay, cubicBezier } = this.settings
      const iterations = baseIterations + this.indexOfWinBonus
      let iteration = 0

      function animate() {
        const progress = Math.round(iteration / iterations * 100)
        const speed = (100 / 2) / speedSet[progress]
        // console.log(progress, speed, baseDelay * speed);

        if (iteration <= iterations) {
          // const delay = baseDelay * ease(0.75, iteration / iterations, ...cubicBezier)
          setTimeout(animate, baseDelay * speed)
          callback(iteration++)
        } else {
          resolve()
        }
      }

      animate()
    }))
  }
}

function OriententionalImg(props: React.ComponentProps<"img">) {
  const [xAxisTurn, setXAxisTurn] = useState(0) // from 0 to 1
  useEffect(() => {
    function handleOrientation(event: DeviceOrientationEvent) {
      if (!event?.alpha) return

      const alpha = event.alpha
      setXAxisTurn(alpha / 360)
    }
    window.addEventListener("deviceorientation", handleOrientation, true)
  }, [])
  // console.log(xAxisTurn);

  const style = {
    ...props.style,
    transform: `rotate(${xAxisTurn}turn)`
  }
  return (
    <img {...props} style={style} />
  )
}

export default connect(state => ({ user: state.user }))(WheelPage)
