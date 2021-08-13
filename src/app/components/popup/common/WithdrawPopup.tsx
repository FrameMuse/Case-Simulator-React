/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// IMAGES
import Snayper from "../../../../assets/images/snayper.png"
// STAFF
import { useEffect, useState } from "react"
import { Article } from "../../formatting/article"
import Button from "../../UI/Button"
import { fetchWithdrawCreate, fetchWithdrawItems } from "../../../api/actions"
import { WeaponDropProps, WeaponItemProps } from "../../../../resources/interfaces/weapon"
import { BulletPointsContainer } from "../../UI/BulletPointsContainer"
import usePopupContext from "../../../../resources/hooks/usePopupContext"
import SelectorList from "../../UI/SelectorList"
import MutuableQuery from "app/components/other/MutuableQuery"
import { PopupDefaultLayout } from "../PopupProvider"
import { ClientAPI } from "app/api/client"
import useAddNotify from "resources/hooks/useAddNotify"
import { useSelector } from "react-redux"
import useTranslation from "resources/hooks/useTranslation"
import { inter } from "resources/utils"
import BrowserHistory from "resources/stores/BrowserHistory"
import { Link, useHistory } from "react-router-dom"
import Popup from "app/controllers/Popup"

export class Skin {
  item: WeaponItemProps
  constructor(weapon: WeaponItemProps) {
    this.item = weapon
  }
  toString() {
    return [Boolean(this.item.StatTrack) && "StatTrack ", this.item.name, " ", this.item.subname]
  }
}


const getRandomFloat = () => Math.random()
const getMockRandom = (number: number) => Number(String(number ** 1.123).slice(-2)) / 100

export default function WithdrawPopup(props: { weaponDrop: WeaponDropProps, onWithdraw: () => void }) {
  const trans = useTranslation(trans => trans.popup.Withdraw)
  const user = useSelector(state => state.user)
  const addNotify = useAddNotify()
  const history = useHistory()
  const { Resolve } = usePopupContext()
  const dropDate = new Date(props.weaponDrop.updated_at || 2313123)
  const [randomPrice] = useState(getMockRandom(dropDate.getTime()))
  const [skin, setSkin] = useState<Skin>()

  const itemPrice = props.weaponDrop.item.price
  const GOLD_PRICE = (itemPrice * 1.25) + randomPrice

  async function submit() {
    if (!props.weaponDrop || !skin) return

    return ClientAPI
      .query(fetchWithdrawCreate(props.weaponDrop.id, skin.item.id, randomPrice))
      .then(({ error }) => {
        if (error) {
          history.push("/profile/settings")
        } else {
          props.onWithdraw()
          addNotify("awaitWithdrawAdmission")
        }

        Resolve()
      })
  }

  if (props.weaponDrop.item.price < 25) {
    return (
      <PopupDefaultLayout title={trans.error?.title} desc={<em>{trans.error?.desc}</em>}>
        <br />
        <br />
        <Button color="green" onClick={Resolve}>{trans.error?.button}</Button>
      </PopupDefaultLayout>
    )
  }


  return (
    <div className="withdraw">
      <div className="withdraw__inner">
        <div className="withdraw__content">
          <Article className="withdraw-article" title={trans.title}>
            <em>{trans.desc}</em>
          </Article>
          <div className="withdraw__section">
            <BulletPointsContainer>
              <p title={trans.bulletPoints?.[0].title}>
                {trans.bulletPoints?.[0].desc}
                <br />
                <div className="withdraw-avatar">
                  <span>{trans.bulletPoints?.[0].yourAvatar}</span>
                  <img src={user.getStandoffPhoto()} className="withdraw-avatar__image" />
                  <Link className="ghost" onClick={() => Popup.resolveAll()} to="/profile/settings" />
                </div>
              </p>
              <p title={trans.bulletPoints?.[1].title}>
                {inter(trans.bulletPoints?.[1].desc, {
                  price: GOLD_PRICE.toFixed(2)
                })}
              </p>
              <p title={trans.bulletPoints?.[2].title}>
                {trans.bulletPoints?.[2].desc}
              </p>
            </BulletPointsContainer>
          </div>
          <div className="withdraw__section">
            <div className="withdraw-selector">
              <div className="withdraw-selector__title">{trans.chooseSkin}</div>
              <MutuableQuery action={fetchWithdrawItems}>
                {({ payload: skins }) => (
                  <div className="withdraw-selector__selector">
                    {/* <Skeleton width="25em" height="2em" /> */}
                    <SelectorList options={skins.map(skin => new Skin(skin))} onSelect={setSkin} />
                  </div>
                )}
              </MutuableQuery>
            </div>
          </div>
          <div className="withdraw__section">
            <Button className="withdraw__button" lazyClick={submit}>{trans.submit}</Button>
          </div>
        </div>
      </div>
      <div className="withdraw-sidebar">
        <img src={Snayper} alt="Snayperman" className="withdraw-sidebar__snayper" />
      </div>
    </div>
  )
}
