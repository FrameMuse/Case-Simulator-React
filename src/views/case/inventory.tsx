/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { Article } from "app/components/formatting/article"
import WeaponList from "app/components/Standoff/WeaponList"
import { WeaponItemProps } from "resources/interfaces/weapon"

export default function Inventory(props: { weapons: WeaponItemProps[] }) {
  return (
    <div className="case-inventory">
      <Article type="center" title="Ты можешь получить" />
      <div className="case-inventory__container">
        <WeaponList items={props.weapons} />
      </div>
    </div>
  )
}
