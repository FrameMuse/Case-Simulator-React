/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { WeaponDropProps } from "resources/interfaces/weapon"
import { addNotify } from "resources/reducers/errors-stack"
import BrowserHistory from "resources/stores/BrowserHistory"
import { BonusAccessPoint } from "routes/origin"
import { BonusProps } from "views/profile/bonuses"
import WebStore from "../../resources/stores/store"
import { fetchBonusActivation, fetchWithdrawCancel, postSellItem } from "../api/actions"
import { ClientAPI } from "../api/client"
import { Translate } from "./Translation"

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

    WebStore.store.dispatch({
      type: "LOCAL_INVENTORY_UPDATE",
      payload: response.payload
    })

    WebStore.store.dispatch({
      type: "CONTRACT/REMOVE",
      payload: ids
    })

    if (drops.length > 1) {
      const totalPrice = drops.reduce((result, drop) => result + drop.item.price, 0)

      WebStore.store.dispatch(
        addNotify("weaponsSold", "success", totalPrice.toPrice())
      )
    } else {
      WebStore.store.dispatch(
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

    WebStore.store.dispatch({
      type: "LOCAL_INVENTORY_UPDATE",
      payload: []
    })

    WebStore.store.dispatch({
      type: "CONTRACT/CLEAR"
    })

    WebStore.store.dispatch(addNotify("allWeaponsSold", "success"))
    return response
  }

  public static async cancelWithdraw(drop_id: number) {
    const response = await ClientAPI.query(fetchWithdrawCancel(drop_id))
    if (response.error) return response

    WebStore.store.dispatch({
      type: "LOCAL_INVENTORY_UPDATE",
      payload: []
    })

    WebStore.store.dispatch(addNotify("withdrawCancelled", "success"))
    return response
  }

  public static async activateBonus({ item_id, item }: BonusProps) {
    const response = await ClientAPI.query(fetchBonusActivation(item_id))
    if (response.error) return response
    if (!response.payload?.success) return

    const bonuses = Translate(trans => trans.bonuses.list) as any
    const notify = bonuses[item_id]?.notify
    if (notify) {
      WebStore.store.dispatch(addNotify(notify, "success"))
    }

    const state = item
    const { case_id } = response.payload
    switch (item_id) {
      case 1:
      case 2:
      case 3: BrowserHistory.push("/payment", state); break

      case 8: BrowserHistory.push("/case/125"); break
      case 9: BrowserHistory.push("/case/" + case_id); break
      case 10: BrowserHistory.push("/case/163"); break

      case 11: BrowserHistory.push("/upgrade"); break
      case 12: BrowserHistory.push("/"); break
      case 13: BrowserHistory.push("/profile/"); break

      case 15:
      case 16:
      case 17:
      case 18: BrowserHistory.push("/payment", state); break

      case 19: BrowserHistory.push("/contract"); break

      case 20:
      case 21:
      case 22:
      case 23: BrowserHistory.push("/payment", state); break

      case 34: BrowserHistory.push("/case/" + case_id); break
      case 35: BrowserHistory.push("/contract"); break
      case 37: BrowserHistory.push("/case/163"); break
      case 39:
      case 40: BrowserHistory.push("/battles"); break

      default:
        break
    }

    return response
  }
}

export default Standoff
