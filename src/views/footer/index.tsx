/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../assets/scss/views/footer.scss"
// IMAGES
// STAFF
import GoUp from "./GoUp"
import useTranslation from "resources/hooks/useTranslation"

export default function Footer() {
  const footer = useTranslation(trans => trans.footer)
  return (
    <footer>
      <section>
        <GoUp />
      </section>
      <section>
        <p className="footer__desc">
          Copy of StandoffCase [08.13.2021]. <br />
          Changes: No Laravel, local database, no users, no profiles, no socket; only home, case pages available; other minor changes.
        </p>
      </section>
    </footer>
  )
}
