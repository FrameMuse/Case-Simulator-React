/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import Button from "../../UI/Button"
import { PopupArticle, PopupDefaultLayout } from "../PopupProvider"
import usePopupContext from "../../../../resources/hooks/usePopupContext"
import useTranslation from "resources/hooks/useTranslation"

export default function ConfirmPopup({ onSubmit }: { onSubmit: Function }) {
  const trans = useTranslation(trans => trans.popup.Confirm)
  const { Resolve } = usePopupContext()
  return (
    <PopupDefaultLayout width="50em" rowGap="3.5em">
      <PopupArticle title={trans.title}>
        <em>{trans.desc}</em>
      </PopupArticle>
      <Button color="green" onClick={() => (Resolve(), onSubmit())}>{trans.confirm}</Button>
    </PopupDefaultLayout>
  )
}
