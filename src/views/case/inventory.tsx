/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { getCasePage } from "app/api/actions"
import { useContextQuery } from "app/components/other/MutuableQuery"
import { Article } from "../../app/components/formatting/article"
import WeaponList from "../../app/components/Standoff/WeaponList"

export default function Inventory() {
  const { payload } = useContextQuery<ReturnType<typeof getCasePage>>()
  return (
    <div className="case-inventory">
      <Article type="center" title="Ты можешь получить" />
      <div className="case-inventory__container">
        <WeaponList items={payload.items.filter(item => !item.hidden)} />
      </div>
    </div>
  )
}
