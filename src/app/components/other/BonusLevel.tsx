/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import { useState } from "react"
import { useSelector } from "react-redux"
import { User } from "resources/interfaces/user"
import "../../../assets/scss/components/bonus-level.scss"
// STAFF
import { ReactComponent as SVGChevron } from "../../../assets/svg/chevron-left.svg"
import { classWithModifiers } from "../../../resources/utils"
import { Article } from "../formatting/article"
import LevelImage from "../UI/LevelImage"

export class LevelProgress {
  static multiplier = 3000
  constructor(
    public value: number,
    public exp: number
  ) { }

  get nextExp() {
    return (this.value + 1) * LevelProgress.multiplier
  }

  get progress() {
    return (LevelProgress.multiplier + (this.exp - this.nextExp)) / LevelProgress.multiplier
  }
}

export default function BonusLevel(props: { type: keyof User["exps"] }) {
  const user = useSelector(state => state.user)
  const modes = useSelector(state => state.modes)
  const level = new LevelProgress(user.lvl, user.exp)

  const [display, setDisplay] = useState(true)
  const modifiers: string[] = []

  if (!display) {
    modifiers.push("active")
  }
  if (modes.demo) return null

  const EXP_GAIN = user.exps[props.type]
  return (
    <div className="bonus-level">
      <div className="bonus-level__container">
        <div className="bonus-level__hide-button" onClick={() => setDisplay(!display)}>
          <div className={classWithModifiers("bonus-level__chevron", modifiers)}>
            <SVGChevron />
          </div>
        </div>
        <Article className="bonus-level-article" modifiers={[!display && "closed"]} title="Уровень">
          Открыв этот кейс ты получешь + <em>{EXP_GAIN}</em> XP
        </Article>
        <div className={classWithModifiers("bonus-level__content", [!display && "closed"])}>
          <div className="bonus-level__idk">
            <div className="bonus-level__inner">
              <div className="bonus-level-bar">
                <div />
                <div className={classWithModifiers("bonus-level-bar__line", [])} />
                <div className="bonus-level-bar__dataset">
                  <div className="bonus-level-bar__text"></div>
                  <div className="bonus-level-bar__text">Осталось {level.nextExp - level.exp} XP</div>
                </div>
              </div>
              <div className="bonus-level__bars">
                <XPBar xp={level.exp} percent={level.progress * 100} color="yellow" />
                <XPBar xp={level.exp + EXP_GAIN} percent={LevelProgress.multiplier / EXP_GAIN} color="green" />
              </div>
            </div>
            <div className="bonus-level__level">
              <LevelImage level={level.value + 1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function XPBar({ xp, percent, color, prefix }: { prefix?: string; xp: number, percent: number, color?: "yellow" | "green" }) {
  if (xp === 0 || percent === 0) return null
  const modifiers: string[] = []

  if (color) {
    modifiers.push(color)
  }

  if (percent >= 100) {
    modifiers.push("full")
  }

  return (
    <div className="bonus-level-bar" style={{ width: (percent || 0) + "%" }}>
      <div className="bonus-level-bar__text">{xp} XP</div>
      <div className={classWithModifiers("bonus-level-bar__line", modifiers)} />
      <div className="bonus-level-bar__text">{prefix}</div>
      <div />
    </div>
  )
}
