/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../assets/scss/views/footer.scss"
// IMAGES
import visaImage from "../../assets/images/pay_systems/visa.png"
import mastercardImage from "../../assets/images/pay_systems/mastercard.png"
import qiwiImage from "../../assets/images/pay_systems/qiwi.png"
import yandexImage from "../../assets/images/pay_systems/yandex.png"
import webmoneyImage from "../../assets/images/pay_systems/webmoney.png"
// STAFF
import GoUp from "./GoUp"
import { StandoffLogo } from "../../app/components/UI/Logo"
import SocialNets from "./SocialNets"
import { Link } from "react-router-dom"
import useTranslation from "resources/hooks/useTranslation"

export default function Footer() {
  const footer = useTranslation(trans => trans.footer)
  return (
    <footer>
      <section>
        <GoUp />
      </section>
      <section>
        <div className="footer__logos">
          <StandoffLogo />
          <div className="logo">
            <img
              src="https://standoffmarket.ru/assets/img/logo.png"
              alt="logo"
              className="logo__image"
            />
            <a className="ghost" href="https://standoffmarket.ru/" rel="noopener noreferrer" />
          </div>
        </div>
        <SocialNets />
      </section>
      <section>
        <p className="footer__desc">
          {footer.desc}
        </p>
      </section>
      <section>
        <div className="footer-links">
          <Link className="footer-links__link" to="/terms-contacts">{footer.links?.termsContracts}</Link>
        </div>
        <div className="footer-logos">
          <img src={visaImage} alt="pay system logo" className="footer-logos__logo" />
          <img src={mastercardImage} alt="pay system logo" className="footer-logos__logo" />
          <img src={qiwiImage} alt="pay system logo" className="footer-logos__logo" />
          <img src={yandexImage} alt="pay system logo" className="footer-logos__logo" />
          <img src={webmoneyImage} alt="pay system logo" className="footer-logos__logo" />
          <a href="//freekassa.ru/">
            <img src="//www.free-kassa.ru/img/fk_btn/17.png" title="Приём оплаты на сайте картами" />
          </a>
          <a href="https://freekassa.ru" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.freekassa.ru/banners/small-dark-1.png" title="Прием платежей" />
          </a>
        </div>
      </section>
      <section>
        <p className="footer__desc">
          Copyright © 2019 - 2021 StandoffCase.net
        </p>
      </section>
    </footer>
  )
}
