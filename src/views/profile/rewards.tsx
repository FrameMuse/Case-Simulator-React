/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "assets/scss/views/profile/rewards.scss"
// IMAGES
import BattlePNG from "assets/images/stats/battle.png"
import CasesPNG from "assets/images/stats/cases.png"
import ContractPNG from "assets/images/stats/contract.png"
import UpgradePNG from "assets/images/stats/upgrade.png"
import { ReactComponent as SVGArrow } from "../../assets/svg/arrow.svg"
// STAFF
import { Component, ForwardedRef, forwardRef, LegacyRef, useContext, useEffect, useRef, useState } from "react"
import { classWithModifiers, getCaseImage, getWeaponImage } from "resources/utils"
import Skeleton from "../../app/skeletons/skeleton"
import useTranslation from "../../resources/hooks/useTranslation"
import { Link } from "react-router-dom"
import useResizeEvent from "resources/hooks/useResizeEvent"
import { useContextQuery } from "app/components/other/MutuableQuery"
import { getUserStats } from "app/api/actions"

// class Rewards extends Component {
//   const ref = useRef(initialValue)
//   render() {
//     return (
//       <div className="rewards">
//         <div className="rewards__arrow rewards__arrow--left">
//           <div className="rewards__icon">
//             <SVGArrow />
//           </div>
//         </div>
//         <RewardsContainer />
//         <div className="rewards__arrow rewards__arrow--right">
//           <div className="rewards__icon">
//             <SVGArrow />
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

class SwitchShift extends Array {
  private currentIndex = 0

  public backward() {
    if (this.currentIndex <= 0) return

    this.currentIndex--
  }

  public forward() {
    if (this.currentIndex >= (this.length - 1)) return

    this.currentIndex++
  }

  public get current() {
    return this[this.currentIndex]
  }

  public get atStart() {
    return this.currentIndex <= 0
  }

  public get atEnd() {
    return this.currentIndex >= (this.length - 1)
  }
}

function getElementScrollPoints(element: HTMLElement) {
  const points: number[] = []

  const CLIENT_WIDTH = element.clientWidth
  const SCROLL_WIDTH = element.scrollWidth

  let diffWidth = SCROLL_WIDTH - CLIENT_WIDTH

  while (diffWidth > 0) {
    points.unshift(diffWidth)
    diffWidth -= CLIENT_WIDTH
  }

  points.unshift(0)

  return points
}

function useSlider(deps: any[] = []) {
  const [, update] = useState(0)
  const [position, setPosition] = useState<SwitchShift>(new SwitchShift())
  const [sliderRef, setSliderRef] = useState<HTMLElement | null>(null)

  function scrollSmoothly() {
    if (!sliderRef) return

    sliderRef.scrollTo({
      behavior: "smooth",
      left: position.current
    })

    update(s => s + 1)
  }

  useEffect(() => {
    if (!sliderRef) return
    const points = getElementScrollPoints(sliderRef)
    setPosition(new SwitchShift(...points))
  }, [...deps, sliderRef])

  return {
    position,
    setSliderRef,
    forward: () => {
      position.forward()
      scrollSmoothly()
    },
    backward: () => {
      position.backward()
      scrollSmoothly()
    }
  }
}

function Rewards() {
  const context = useContextQuery<ReturnType<typeof getUserStats>, null>()
  const size = useResizeEvent()
  const { setSliderRef, forward, backward, position } = useSlider([size, context])
  return (
    <div className="rewards">
      <div className={classWithModifiers("rewards__arrow", ["left", position.atStart && "hidden"])} onClick={backward}>
        <div className="rewards__icon">
          <SVGArrow />
        </div>
      </div>
      <RewardsContainer setRef={setSliderRef} />
      <div className={classWithModifiers("rewards__arrow", ["right", position.atEnd && "hidden"])} onClick={forward}>
        <div className="rewards__icon">
          <SVGArrow />
        </div>
      </div>
    </div>
  )
}

interface RewardProps {
  link?: string
  image: string
  value?: (string | number | undefined)[]
  desc?: string
  byWidth?: boolean
}

function Reward({ image, value: rawValue, desc, byWidth, link }: RewardProps) {
  const trans = useTranslation(trans => trans.general)
  const { loading } = useContextQuery<ReturnType<typeof getUserStats>, null>()

  if (!rawValue) {
    return null
  }

  const value = rawValue.map(formatValue)

  function formatValue(value?: string | number) {
    if (value == null) {
      return trans.empty
    }
    return value.toLocaleString()
  }

  return (
    <div className="rewards__reward">
      {loading ? (
        <Skeleton width="5.5em" height="5em" />
      ) : (
        <img src={image} alt="reward" className={classWithModifiers("rewards__image", [byWidth && "byWidth"])} />
      )}
      <span className="rewards__value">{loading ? <Skeleton /> : value.toString().replace(/,/g, " / ")}</span>
      <p className="rewards__desc">{desc || "Not translated"}</p>
      {link && <Link className="ghost" to={link} />}
    </div>
  )
}

function RewardsContainer({ setRef }: { setRef: React.Dispatch<React.SetStateAction<HTMLElement | null>> }) {
  const views = useTranslation(trans => trans.views)
  const cases = useTranslation(trans => trans.cases)

  const { payload } = useContextQuery<ReturnType<typeof getUserStats>, null>()

  const rewards = payload?.rewards
  const caseTrans = cases[rewards?.bestCase?.id || 0]

  return (
    <div className="rewards__inner" ref={el => setRef(el)}>
      <Reward link="/" image={CasesPNG} value={[rewards?.cases]} desc={views.profile?.rewards?.cases} />
      <Reward link="/contract" image={ContractPNG} value={[rewards?.contracts]} desc={views.profile?.rewards?.contracts} />
      <Reward link="/battles" image={BattlePNG} value={[rewards?.battles?.win, rewards?.battles?.lose, rewards?.battles?.draw]} desc={views.profile?.rewards?.battles} />
      <Reward link="/upgrade" image={UpgradePNG} value={[rewards?.upgrades?.win, rewards?.upgrades?.lose]} desc={views.profile?.rewards?.upgrades} />

      <Reward link={rewards?.bestCase ? ("/case/" + rewards?.bestCase?.id) : "/"} image={getCaseImage(rewards?.bestCase?.id)} value={[caseTrans?.title]} desc={views.profile?.rewards?.bestCase} byWidth />
      <Reward link="/" image={getWeaponImage(rewards?.bestItemCases?.id || 0, true)} value={[rewards?.bestItemCases?.subname]} desc={views.profile?.rewards?.bestDrop} byWidth />

      <Reward link="/contract" image={getWeaponImage(rewards?.bestItemContracts?.id || 0, true)} value={[rewards?.bestItemContracts?.subname]} desc="Лучший дроп контракта" byWidth />
      <Reward link="/upgrade" image={getWeaponImage(rewards?.bestItemUpgrades?.id || 0, true)} value={[rewards?.bestItemUpgrades?.subname]} desc="Лучший дроп апгрейда" byWidth />
      <Reward link="/battles" image={getCaseImage(rewards?.bestCaseBattles?.id)} value={[cases[rewards?.bestCaseBattles?.id || 0]?.title]} desc="Любимый кейс сражения" byWidth />
      {rewards?.bestItemBattles && (
        <Reward link="/battles" image={getWeaponImage(rewards.bestItemBattles.id, true)} value={[rewards?.bestItemBattles?.subname]} desc="Лучший дроп сражения" byWidth />
      )}
    </div>
  )
}

export default Rewards
