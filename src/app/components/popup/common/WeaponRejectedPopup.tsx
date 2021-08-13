/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import Button from "../../UI/Button"
import { BulletPointsContainer } from "../../UI/BulletPointsContainer"
import { PopupArticle, PopupDefaultLayout } from "../PopupProvider"
import usePopupContext from "../../../../resources/hooks/usePopupContext"
import useTranslation from "resources/hooks/useTranslation"

export default function WeaponRejectedPopup() {
  const trans = useTranslation(trans => trans.popup.WeaponRejected)
  const { Resolve } = usePopupContext()
  return (
    <PopupDefaultLayout width="65em" rowGap="3.5em">
      <PopupArticle title={trans.title}>
        <em>{trans.desc}</em>
      </PopupArticle>
      <BulletPointsContainer>
        <p>
          {trans.point1}
        </p>
        <p>
          {trans.point2}
        </p>
      </BulletPointsContainer>
      <Button color="green" onClick={Resolve}>{trans.submit}</Button>
    </PopupDefaultLayout>
  )
}
