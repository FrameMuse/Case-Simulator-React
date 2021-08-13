/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import React from "react"
import { Link } from "react-router-dom"
import useTranslation from "../../resources/hooks/useTranslation"
// SCSS
import "../../assets/scss/views/banners.scss"

function Banners() {
  return (
    <div className="banner">
      <div className="banner__inner"></div>
    </div>
  )
}

function Banner(props: { title: string, img: string, desc?: string, children?: any }) {
  return (
    <div className="banners__banner">
      <div className="banners__article">
        <h2 className="banners__title">{props.title}</h2>
        <div className="banners__description">{props.desc || props.children}</div>
      </div>
      <img src={"/assets/images/banners/" + props.img} alt="banner preview" className="banners__preview" />
      <Link className="ghost" to="/analy" />
    </div>
  )
}

export default Banners
