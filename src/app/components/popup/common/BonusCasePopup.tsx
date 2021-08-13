/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { PopupArticle, PopupDefaultLayout } from "../PopupProvider"
import { getCaseImage } from "resources/utils"
import useTranslation from "resources/hooks/useTranslation"

export default function BonusCasePopup(props: { time: string }) {
  const trans = useTranslation(trans => trans.popup.BonusCase)
  return (
    <div style={{ display: "grid" }}>
      <img src={getCaseImage(1)} style={{ height: "20em", margin: "-10em auto 0", transform: "scale(1)" }} />
      <PopupDefaultLayout rowGap="3.5em">
        <PopupArticle title={trans.title} type="center">
          <em>
            {trans.desc}
          </em>
        </PopupArticle>
        {/* TO-DO: [TIMER] */}
      </PopupDefaultLayout>
    </div>
  )
}
