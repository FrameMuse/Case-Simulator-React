/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { useLayoutEffect, useState } from "react"
import Weapon from "app/components/Standoff/Weapon"
import { randomInt } from "../../resources/utils/random"
import { CaseContainerState } from "./CaseContainer"

export default function CaseScrolling({ onScrollingEnd, scrollWeapons, currentDropIndex }: Pick<CaseContainerState, "currentDropIndex" | "scrollWeapons"> & { onScrollingEnd: () => void }) {
  const [indent, setIndent] = useState<number | null>(null)
  const [innerRef, setInnerRef] = useState<HTMLElement | null>(null)
  const [clientContainer, setClientContainer] = useState<HTMLElement | null>(null)

  function calcIndent(ref: HTMLElement) {
    const target = ref.children[currentDropIndex] as HTMLElement // currentDropIndex is index of target to scroll to
    // console.log(target, currentDropIndex)

    if (!clientContainer) {
      throw new Error("clientContainer is null")
    }

    if (target) {
      const { offsetLeft, offsetWidth } = target
      const halfContentWidth = clientContainer.clientWidth / 2
      const halfChildWidth = offsetWidth / 2

      // console.log('====================================')
      // console.log(clientContainer)
      // console.log('====================================')

      setIndent(offsetLeft - halfContentWidth + offsetWidth - halfChildWidth)
    } else {
      if (process.env.NODE_ENV === "development") {
        console.error("lastChild is empty")
      }
    }
  }

  useLayoutEffect(() => {
    function calcEvent() {
      if (innerRef) {
        calcIndent(innerRef)
      }
    }

    calcEvent()

    window.addEventListener("resize", calcEvent)
    return () => {
      window.removeEventListener("resize", calcEvent)
    }
  }, [innerRef])

  return (
    <div className="case-page-scroll" ref={setClientContainer}>
      {scrollWeapons.map((weaponItemList, key) => (
        <div className="case-page-scroll__section" style={{ "--weapon-scroll-x": indent ? indent + randomInt(-100, 100) + "px" : null }} key={"scroll_section" + key}>
          <div className="case-page-scroll__inner" ref={setInnerRef} onTransitionEnd={onScrollingEnd}>
            {weaponItemList.map((item, index) => (
              <Weapon key={"scroll_weapon_" + item.id + index} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
