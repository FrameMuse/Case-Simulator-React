/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "assets/scss/popups/level-desc.scss"
// IMAGES
import { ReactComponent as ShieldSVG } from "assets/svg/shield.svg"
import { ReactComponent as ChevronsUpSVG } from "assets/svg/chevrons-up.svg"
import { ReactComponent as FillTextSVG } from "assets/svg/fill-text.svg"
import OpenCaseBluePNG from "assets/images/icons/open-case-blue.png"
// STAFF
import { PopupArticle, PopupDefaultLayout } from "../PopupProvider"
import { useSelector } from "react-redux"
import LevelImage from "app/components/UI/LevelImage"
import MutuableQuery from "app/components/other/MutuableQuery"
import { fetchUserLvls } from "app/api/actions"
import DetailBonusBox from "views/wheel/DetailBonusBox"
import useTranslation from "resources/hooks/useTranslation"

export default function LevelDescPopup() {
  const trans = useTranslation(trans => trans.popup.LevelDesc)
  const user = useSelector(state => state.user)
  return (
    <div className="level-desc">
      <div className="level-desc__level">
        <LevelImage level={user.lvl} />
      </div>
      <PopupDefaultLayout className="level-desc__content" width="56em" rowGap="3.5em">
        <PopupArticle type="center" title={trans.title}>
          {trans.desc}
        </PopupArticle>
        <div className="level-desc__ways">
          <LevelDescWay icon={<img src={OpenCaseBluePNG} className="icon" />} title={trans.case} xp={user.exps.case} />
          <LevelDescWay icon={<FillTextSVG />} title={trans.contract} xp={user.exps.contract} />
          <LevelDescWay icon={<ChevronsUpSVG />} title={trans.upgrade} xp={user.exps.upgrade} />
          <LevelDescWay icon={<ShieldSVG />} title={trans.battle} xp={user.exps.battle} />
        </div>
        <PopupArticle type="center" title={trans.prizeTitle}>
          {trans.prizeDesc}
        </PopupArticle>
        <MutuableQuery action={fetchUserLvls}>
          {({ payload }) => (
            <div className="level-bonuses wheel-inventory bonuses-container">
              {payload.tickets.map((ticket, index) => (
                <DetailBonusBox termsInHeader {...ticket} key={"prize_" + index} />
              ))}
            </div>
          )}
        </MutuableQuery>
      </PopupDefaultLayout>
    </div>
  )
}

function LevelDescWay(props: { icon: any; title?: string; xp: string | number }) {
  return (
    <div className="level-desc-way">
      <div className="level-desc-way__circle">{props.icon}</div>
      <div className="level-desc-way__title">{props.title}</div>
      <div className="level-desc-way__xp">+{props.xp}XP</div>
    </div>
  )
}
