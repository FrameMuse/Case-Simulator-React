/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { WeaponDropProps } from "resources/interfaces/weapon"
import { addNotify } from "app/redux/reducers/errors-stack"
import store from "../redux/store"
import { fetchWithdrawCancel, postSellItem } from "../api/actions"
import { ClientAPI } from "../api/client"

/**
 * Standoff controller
 */
class Standoff {
  /**
   * 
   * Post a SellRequest and then dispatch payload to inventory
   * @param arg1 id or ids
   */
  public static async sell(...drops: WeaponDropProps[]) {
    const ids = drops.map(drop => drop.id)
    const response = await ClientAPI.query(postSellItem(ids, "ids"))

    if (response.error) return response

    store.dispatch({
      type: "LOCAL_INVENTORY_UPDATE",
      payload: response.payload
    })

    store.dispatch({
      type: "CONTRACT/REMOVE",
      payload: ids
    })

    if (drops.length > 1) {
      const totalPrice = drops.reduce((result, drop) => result + drop.item.price, 0)

      store.dispatch(
        addNotify("weaponsSold", "success", totalPrice.toPrice())
      )
    } else {
      store.dispatch(
        addNotify("weaponSold", "success", drops[0].item.price.toPrice())
      )
    }

    return response
  }

  /**
   * 
   * Post a SellAllDrops request and then dispatch payload to inventory
   */
  public static async sellAll() {
    const response = await ClientAPI.query(postSellItem(null, "all"))
    if (response.error) return response

    store.dispatch({
      type: "LOCAL_INVENTORY_UPDATE",
      payload: []
    })

    store.dispatch({
      type: "CONTRACT/CLEAR"
    })

    store.dispatch(addNotify("allWeaponsSold", "success"))
    return response
  }

  public static async cancelWithdraw(drop_id: number) {
    const response = await ClientAPI.query(fetchWithdrawCancel(drop_id))
    if (response.error) return response

    store.dispatch({
      type: "LOCAL_INVENTORY_UPDATE",
      payload: []
    })

    store.dispatch(addNotify("withdrawCancelled", "success"))
    return response
  }
}

export default Standoff
