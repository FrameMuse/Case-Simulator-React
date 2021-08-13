/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import Icon from "../../app/components/UI/Icon"
import "../../assets/scss/components/social-nets.scss"

export default function SocialNets() {
  return (
    <div className="social-nets">
      <div className="social-nets__item">
        {/* <span className="social-nets__icon icon" /> */}
        <Icon name="tg" />
        <a className="ghost" rel="noreferrer noopener" target="_blank" href="https://t.me/standoffcaseru" />
      </div>
      <div className="social-nets__item">
        <Icon name="inst" />
        <a className="ghost" rel="noreferrer noopener" target="_blank" href="https://www.instagram.com/standoffcase/" />
      </div>
      <div className="social-nets__item">
        <Icon name="vk" />
        <a className="ghost" rel="noreferrer noopener" target="_blank" href="https://vk.com/standoffcase" />
      </div>
      <div className="social-nets__item">
        <Icon name="yt" />
        <a className="ghost" rel="noreferrer noopener" target="_blank" href="https://www.youtube.com/channel/UCpPYX9suGwFC921OMwqqDbQ" />
      </div>
      <div className="social-nets__item">
        <Icon name="steam" />
        <a className="ghost" rel="noreferrer noopener" target="_blank" href="https://steamcommunity.com/groups/standoffcase" />
      </div>
    </div>
  )
}
