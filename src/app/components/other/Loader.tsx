/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import "../../../assets/scss/components/loader.scss"

import { useEffect, useState } from "react"
import Logo from "../UI/Logo"
import { classWithModifiers, getRandomNumber } from "../../../resources/utils"

export default function Loader(props: { overlap?: boolean }) {
  const [filled, setFilled] = useState(30)

  useEffect(() => {
    const interval = setInterval(() => {
      setFilled(filled => {
        const value = filled + getRandomNumber(0, 5)

        if (value > 99) {
          return 99
        }

        return value
      })
    }, getRandomNumber(0, 100) * 10)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className={classWithModifiers("loader", [props.overlap && "overlap"])}>
      <Logo unlink />
      <div className="loader-container">
        <div className="loader-progress">
          <div className="loader-progress__line" style={{ width: filled + "%" }} />
        </div>
        <span className="loader__percent">{filled}%</span>
      </div>
    </div>
  )
}
