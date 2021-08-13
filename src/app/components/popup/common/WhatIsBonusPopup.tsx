/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import Icon from "app/components/UI/Icon"
import useTranslation from "resources/hooks/useTranslation"
import { PopupArticle, PopupDefaultLayout } from "../PopupProvider"

export default function WhatIsBonusPopup() {
  const trans = useTranslation(trans => trans.popup.WhatIsBonus)
  return (
    <PopupDefaultLayout width="65em">
      <PopupArticle title={trans.title}>
        <em>
          <Icon name="b" /> <span>- {trans.desc}</span>
        </em>
      </PopupArticle>
    </PopupDefaultLayout>
  )
}
