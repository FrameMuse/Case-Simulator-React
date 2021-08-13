/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { fetchWithdrawNotify as fetchWithdrawMarkAsRead, getActionT, getUserInventory } from "app/api/actions"
import { ClientAPI } from "app/api/client"
import { BulletPointsContainer } from "app/components/UI/BulletPointsContainer"
import Button from "app/components/UI/Button"
import usePopupContext from "resources/hooks/usePopupContext"
import useTranslation from "resources/hooks/useTranslation"
import { inter } from "resources/utils"
import { PopupDefaultLayout } from "../PopupProvider"

type WidthdrawNotifyList = getActionT<ReturnType<typeof getUserInventory>>["withdrawNotify"]

export default function ErrorWithdrawCancelledPopup(props: {
  drop: WidthdrawNotifyList[0]
}) {
  const trans = useTranslation(trans => trans.popup.ErrorWithdrawCancelled)
  const { Resolve } = usePopupContext()
  async function markAsRead() {
    await ClientAPI.query(fetchWithdrawMarkAsRead(props.drop.drop_id))

    Resolve()
  }
  return (
    <PopupDefaultLayout width="58em" {...trans} desc={inter(trans.desc, { dropName: props.drop.name })}>
      <BulletPointsContainer>
        {
          trans.points?.map((point, index) => (
            <p key={"point_" + index}>{point}</p>
          ))
        }
      </BulletPointsContainer>
      <br />
      <br />
      <br />
      <Button color="yellow" lazyClick={markAsRead}>{trans.button}</Button>
    </PopupDefaultLayout>
  )
}