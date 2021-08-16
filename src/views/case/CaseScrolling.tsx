/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { useLayoutEffect, useState } from "react"
import Weapon from "app/components/Standoff/Weapon"
import { randomInt } from "../../resources/utils/random"
import { WeaponDropProps, WeaponItemProps } from "resources/interfaces/weapon"
import { shuffleWeaponItems } from "./CaseHelpers"

interface CaseScrollingProps {
  drops: WeaponDropProps[]
  weapons: WeaponItemProps[]
  onScrollingEnd(): void
}

const DEFAULT_DROP_PUT_INDEX = 24

function CaseScrolling(props: CaseScrollingProps) {
  const [indent, setIndent] = useState<number | null>(null)
  const [innerRef, setInnerRef] = useState<HTMLElement | null>(null)
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null)

  // const weaponScrolls = getWeaponScrolls(props.drops, props.weapons, DEFAULT_DROP_PUT_INDEX)

  function mixedWeapons(dropToPut: WeaponDropProps) {
    const items = shuffleWeaponItems(props.weapons)
    items.splice(DEFAULT_DROP_PUT_INDEX, 0, dropToPut.item)

    return items
  }

  function calcIndent(ref: HTMLElement, index: number) {
    const target = ref.children[index] as HTMLElement
    // console.log(target, currentDropIndex)

    if (!scrollContainer) {
      throw new Error("clientContainer is null")
    }

    if (target) {
      const { offsetLeft, offsetWidth } = target
      const halfContentWidth = scrollContainer.clientWidth / 2
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
        calcIndent(innerRef, DEFAULT_DROP_PUT_INDEX)
      }
    }

    calcEvent()

    window.addEventListener("resize", calcEvent)
    return () => {
      window.removeEventListener("resize", calcEvent)
    }
  }, [innerRef])

  return (
    <div className="case-page-scroll" ref={setScrollContainer}>
      {props.drops.map((drop, key) => (
        <div className="case-page-scroll__section" style={{ "--weapon-scroll-x": indent ? indent + randomInt(-100, 100) + "px" : null }} key={"scroll_section" + key}>
          <div className="case-page-scroll__inner" ref={setInnerRef} onTransitionEnd={props.onScrollingEnd}>
            {mixedWeapons(drop).map((weapon, index) => (
              <Weapon key={"scroll_weapon_" + weapon.id + index} item={weapon} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CaseScrolling
