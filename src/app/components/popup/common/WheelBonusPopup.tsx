/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import useTranslation from "resources/hooks/useTranslation"
import { getBonusImage } from "../../../../resources/utils"
import { PopupDefaultLayout, PopupText } from "../PopupProvider"

export default function WheelBonusPopup(props: { id: number }) {
  const trans = useTranslation(trans => trans.popup.WheelBonus)
  return (
    <PopupDefaultLayout width="62em" rowGap="2.5em">
      <h2>{trans.title}</h2>
      <PopupText style={{ display: "flex", alignItems: "center" }}>
        <img height="125px" src={getBonusImage(props.id)} alt="bonus" />
        {trans.desc}
      </PopupText>
    </PopupDefaultLayout>
  )
}
