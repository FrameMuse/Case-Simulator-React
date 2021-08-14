/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import { User } from "resources/interfaces/user"
import "../../../assets/scss/components/bonus-level.scss"
// STAFF
import { classWithModifiers } from "../../../resources/utils"

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
  return null
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
