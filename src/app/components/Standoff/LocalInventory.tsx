/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { WeaponDropProps } from "../../../resources/interfaces/weapon"
import { WeaponProps } from "./Weapon"
import Weapon from "./Weapon"
import { useEffect } from "react"
import store from "app/redux/store"
import Empty from "../other/Empty"
import { useContextQuery } from "../other/MutuableQuery"
import { QueryPagination } from "app/features/Query/QueryPagination"
import { getUserInventory } from "app/api/actions"

interface InventoryContainerProps {
  exept?: number[]
  maxHeight?: string
  action?: WeaponProps["action"]
  filter?: (weapon: WeaponDropProps) => boolean
}

/**
 * Must be in a query context
 * @param param0 
 * @returns 
 */
export function InventoryContainer({ exept, filter, maxHeight, action }: InventoryContainerProps) {
  const { payload, query } = useContextQuery<ReturnType<typeof getUserInventory>>()
  useEffect(() => {
    return store.actionSubscribe(action => {
      if (action.type === "LOCAL_INVENTORY_UPDATE") {
        query()
      }
    })
  }, [query])

  const drops = payload.items.data

  if (drops.length <= 0) {
    return <Empty />
  }

  return (
    <QueryPagination use="items">
      <div className="weapons-container" style={{ height: maxHeight, overflow: "auto" }}>
        {drops.map(drop => (filter?.(drop) ?? true) && !exept?.includes(drop.id) && (
          <Weapon {...drop} action={action} key={"drop_key_" + drop.id} />
        ))}
      </div>
    </QueryPagination>
  )
}
