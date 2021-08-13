/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../assets/scss/views/bonuses.scss"
// STAFF
import Popup from "../../app/controllers/Popup"
import useTranslation from "resources/hooks/useTranslation"
import { Article } from "app/components/formatting/article"
import BonusDailyPopup from "app/components/popup/common/BonusDailyPopup"
import BonusSinglePopup from "app/components/popup/common/BonusSinglePopup"
import Bonus3kPopup from "app/components/popup/common/Bonus3kPopup"

export default function Bonuses() {
  const bonuses = useTranslation(trans => trans.views.bonuses)
  return (
    <div className="bonuses">
      <div className="bonuses__bonus" onClick={() => Popup.open(BonusDailyPopup)}>
        <Article className="bonus-article" title={bonuses.daily?.title}>
          {bonuses.daily?.desc}
        </Article>
      </div>
      <div className="bonuses__bonus" onClick={() => Popup.open(BonusSinglePopup)}>
        <Article className="bonus-article" title={bonuses.single?.title}>
          {bonuses.single?.desc}
        </Article>
      </div>
      <div className="bonuses__bonus" onClick={() => Popup.open(Bonus3kPopup)}>
        <Article className="bonus-article" title={bonuses["3k"]?.title}>
          {bonuses["3k"]?.desc}
        </Article>
      </div>
    </div>
  )
}
