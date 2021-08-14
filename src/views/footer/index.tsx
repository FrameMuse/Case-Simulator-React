/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../assets/scss/views/footer.scss"
// IMAGES
// STAFF
import GoUp from "./GoUp"
import { StandoffLogo } from "app/components/UI/Logo"
import SocialNets from "./SocialNets"
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
          Copyright © 2019 - 2021 StandoffCase.net
        </p>
      </section>
    </footer>
  )
}
