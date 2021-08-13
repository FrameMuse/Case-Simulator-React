/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { useSelector } from "react-redux"
import { classWithModifiers } from "../../../resources/utils"

interface LevelType {
  colorName: "gray" | "paleblue" | "skyblue" | "blue" | "purple" | "pink" | "red" | "orange" | "yellow" | "green"
  shapeName: "square" | "squareWithChar" | "doubleSquare" | "circle" | "circleWithChar" | "doubleCircle" | "star" | "starWithChar" | "doubleStar"
}

class Level {
  constructor(
    private level: number
  ) { }

  /**
   * 
   * @param number Number to parse
   * @param multiplier Amount of digits to get
   * @returns Floored number with [digit] amount of digits.
   */
  getDigitFromNumber(number: number, multiplier: number) {
    // const multiplier = (10 ** digit)
    return Math.floor((number % (multiplier * 10)) / multiplier) * multiplier
  }

  /**
   * Define color for every 10 level
   */
  get colorName(): LevelType["colorName"] {
    switch (this.getDigitFromNumber(this.level, 10)) {

      case 10:
        return "paleblue"

      case 20:
        return "skyblue"

      case 30:
        return "blue"

      case 40:
        return "purple"

      case 50:
        return "pink"

      case 60:
        return "red"

      case 70:
        return "orange"

      case 80:
        return "yellow"

      case 90:
        return "green"

      default:
        return "gray"

    }
  }

  /**
   * Define shape for every 100 level
   */
  get shapeName(): LevelType["shapeName"] {
    switch (this.getDigitFromNumber(this.level, 100)) {

      case 100:
        return "circle"

      case 200:
        return "star"

      case 300:
        return "squareWithChar"

      case 400:
        return "circleWithChar"

      case 500:
        return "starWithChar"

      case 600:
        return "doubleSquare"

      case 700:
        return "doubleCircle"

      case 800:
        return "doubleStar"

      default:
        return "square"

    }
  }
}

function LevelImage(props: { level: number; type?: "filled" }) {
  const { demo } = useSelector(state => state.modes)
  if (demo) {
    return null
  }
  try {
    const { colorName, shapeName } = new Level(props.level)
    const { default: Shape } = require("../../../assets/images/levels/" + shapeName)

    return (
      <div className="level-image">
        {Shape && <Shape id="svg-icon" className={classWithModifiers("level-image__shape", [props.type, colorName])} />}
        <span className="level-image__level">{props.level}</span>
      </div>
    )
  } catch (e) { }

  return null
}

export default LevelImage
