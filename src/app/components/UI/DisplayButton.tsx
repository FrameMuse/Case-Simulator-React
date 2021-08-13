/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import ButtonTool from "./ButtonTool"
import { useEffect, useState } from "react"
import { classWithModifiers } from "../../../resources/utils"
// SVG
import { ReactComponent as SVGChevron } from "../../../assets/svg/chevron-left.svg"

export default function DisplayButton({ children, onChange, defaultValue = false }: { defaultValue?: boolean; children?: any, onChange?(state: boolean): void }) {
  const [state, setState] = useState(defaultValue)
  const modifiers: Array<string | undefined> = []

  if (state) {
    modifiers.push("up")
  }

  if (!state) {
    modifiers.push("down")
  }

  useEffect(() => onChange && onChange(state), [onChange, state])

  return (
    <ButtonTool
      onClick={() => setState(!state)}
      children={children}
      iconRight={<SVGChevron className={classWithModifiers("svg-chevron", modifiers)} />}
    />
  )
}
