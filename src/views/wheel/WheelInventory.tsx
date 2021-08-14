/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { fetchWheelItems } from "app/api/actions"
import { useContextQuery } from "app/components/other/MutuableQuery"
import useTranslation from "resources/hooks/useTranslation"
import { Article } from "app/components/formatting/article"
import DetailBonusBox from "./DetailBonusBox"

export default function WheelInventory() {
  const trans = useTranslation(trans => trans.views.wheel)
  const { payload } = useContextQuery<typeof fetchWheelItems>()
  return (
    <>
      <Article title={trans.inventoryTitle} type="center">
        {trans.inventoryDesc}
      </Article>
      <div className="wheel-inventory bonuses-container">
        {payload.list.map((bonusId, index) => (
          <DetailBonusBox id={bonusId} key={"bonus_box_" + index} />
        ))}
      </div>
    </>
  )
}
