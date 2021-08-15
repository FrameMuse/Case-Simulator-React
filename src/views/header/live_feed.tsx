/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../assets/scss/views/live-feed.scss"
// IMAGES
import ContractPNG from "assets/images/stats/contract.png"
import UpgradePNG from "assets/images/stats/upgrade.png"
// STAFF
import TriangleSVG from "../../assets/svg/triangle"
import { useSelector } from "react-redux"
import { WeaponItemProps } from "../../resources/interfaces/weapon"
import { classWithModifiers, getCaseImage, getWeaponImage } from "../../resources/utils"
import TimeAgo from "timeago-react"
import useTranslation from "../../resources/hooks/useTranslation"
import { MiniUserTemplate } from "app/components/other/MiniUser"
import { Person } from "../../resources/interfaces/user"
import { Link } from "react-router-dom"
// TimeAgo
import Ru from "timeago.js/lib/lang/ru"
import { register } from "timeago.js"
import { useState } from "react"
register("ru", Ru)

function LiveFeed() {
  const [filter, setFilter] = useState(true)
  const liveFeedTrans = useTranslation(trans => trans.header.liveFeed)
  const liveFeed = useSelector(state => filter ? state.liveFeed.TopliveList : state.liveFeed.liveList)
  return (
    <div className="live-feed">
      <div className="live-feed__header">
        <div className="live-feed__left">
          <span className="live-feed__status" />
          <h2 className="live-feed__title">{liveFeedTrans.title}</h2>
        </div>
      </div>
      <div className="live-feed__container">
        {liveFeed.map((element, index) => (
          <LiveFeedElement key={"live_feed_element_" + index} {...element} />
        ))}
      </div>
    </div>
  )
}

export interface LiveFeedElementProps {
  item: WeaponItemProps
  user: Person

  user_id: number
  case_id?: number
  bonus_id?: number
  contract_id?: number
  upgrade_id?: number

  id: number
  fast: boolean
  payback: boolean
  created_at: string | Date
}

function LiveFeedElement(props: LiveFeedElementProps) {
  const user = useSelector(state => state.user)
  const datetime = new Date(props.created_at).getTime()
  const translation = useTranslation()
  // const [display, setDisplay] = useState(getIfDisplay())
  // function getIfDisplay() {
  //   return Date.now() > datetime
  // }
  // useEffect(() => {
  //   const interval = setInterval(() => setDisplay(getIfDisplay()), 2500)
  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [props.created_at])
  // if (!display) return null
  return (
    <div className={classWithModifiers("live-feed-element", [props.item.class_name?.toLowerCase()])}>
      <div className="live-feed-element__inner">
        <div className="live-feed-element__info">
          <p className="live-feed-element__title live-feed-hover__hide">
            {Boolean(props.item.StatTrack) && "StatTrack"} {props.item.name}
            <br />
            {props.item.subname}
          </p>
          <div className="live-feed-element__user live-feed-hover__show">
            <MiniUserTemplate user={props.user} />
          </div>
          <TimeAgo
            className="live-feed-element__timeago"
            datetime={datetime - 3500}
            locale={translation.langCode}
          />
          <Link className="ghost" to={"/profile/" + (props.user_id === user.id ? "" : props.user_id)} />
        </div>
        <div className="live-feed-element__imager">
          <div className="live-feed-element__image live-feed-hover__hide">
            <div className="live-feed-element__glow" />
            <div className="live-feed-element__triangle">
              <TriangleSVG />
            </div>
            <img src={getWeaponImage(props.item.id)} alt="weapon" className="live-feed-element__weapon-image" />
          </div>
          {props.case_id && (
            <ImageAndLink image={getCaseImage(props.case_id)} link={"/case/" + props.case_id} />
          )}
          {props.contract_id && (
            <ImageAndLink image={ContractPNG} link="/contract" />
          )}
          {props.upgrade_id && (
            <ImageAndLink image={UpgradePNG} link="/upgrade" />
          )}
          {/* {props.bonus_id && (
            <ImageAndLink image={bonusp} link="/wheel" />
          )} */}
        </div>
      </div>
    </div>
  )
}

function ImageAndLink(props: { image: string; link: string }) {
  return (
    <>
      <img src={props.image} alt="drop" className="live-feed-element__case-image live-feed-hover__show" />
      <Link className="ghost" to={props.link} />
    </>
  )
}

export default LiveFeed
