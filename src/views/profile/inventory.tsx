/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { BranchContainer, BranchHeader, BranchSection } from "../../app/components/formatting/branch"
import Row from "../../app/components/UI/Row"
import DisplayButton from "../../app/components/UI/DisplayButton"
import PriceFromTo from "../../app/components/UI/PriceFromTo"
import Search from "../../app/components/UI/Search"
import { useEffect, useState } from "react"
import RaritySelector from "../../app/components/Standoff/RaritySelector"
import Skeleton from "../../app/skeletons/skeleton"
import useTranslation from "../../resources/hooks/useTranslation"
import { Filters } from "../../resources/interfaces/game"
import Button from "../../app/components/UI/Button"
import { useSelector } from "react-redux"
import { getActionT, getUserInventory, getUserStats } from "../../app/api/actions"
import { WeaponDropProps } from "../../resources/interfaces/weapon"
import Standoff from "../../app/controllers/Standoff"
import ProfileDrop, { ProfileDropCallbackType } from "./drop"
import Popup from "app/controllers/Popup"
import { QueryProvider, useContextQuery } from "app/components/other/MutuableQuery"
import { QueryPagination } from "app/features/Query/QueryPagination"
import ClientSocket from "app/socket/ClientSocket"
import ErrorWithdrawCancelledPopup from "app/components/popup/errors/ErrorWithdrawCancelledPopup"
import { inter } from "resources/utils"
import ConfirmPopup from "app/components/popup/common/ConfirmPopup"

export function CompactFilters({ onChange, display, filters }: { filters?: Partial<Filters>, onChange: (filters: Partial<Filters>) => void, display: boolean }) {
  const trans = useTranslation(trans => trans.general.case)
  const [innerFilters, setInnerFilters] = useState<Partial<Filters>>(filters || { minPrice: 0, maxPrice: 0 })
  useEffect(() => filters && setInnerFilters({ ...filters }), [filters])
  function setFilters(filters: Partial<Filters>) {
    onChange(filters)
    setInnerFilters(filters)
  }
  return (
    <BranchContainer style={{ display: display ? undefined : "none" }}>
      <Row>
        <Search width="15em" placeholder={trans.searchPlaceholder} value={innerFilters.name} onChange={event => setFilters({ ...innerFilters, name: event.target.value })} />
        <PriceFromTo from={innerFilters.minPrice} to={innerFilters.maxPrice} onChange={data => setFilters({ ...innerFilters, ...data })} />
        <RaritySelector choice={innerFilters.rarity ? undefined : 0} onSelect={rarity => setFilters({ ...innerFilters, rarity })} />
        <Button onClick={() => setFilters({ name: "", minPrice: 0, maxPrice: 0 })}><em className="red-color">{trans.searchClear}</em></Button>
      </Row>
    </BranchContainer>
  )
}

export default function Inventory() {
  const { loading: profileLoading, payload: profile, modifyPayload } = useContextQuery<ReturnType<typeof getUserStats>, null>()
  const trans = useTranslation(trans => trans.views.profile.branch.inventory)

  const user = useSelector(state => state.user)
  const [filters, setFilters] = useState<Partial<Filters>>()
  const [displayFilters, setDisplayFilters] = useState(false)

  function differItemsCount(items?: number) {
    if (!profile || !items) return

    modifyPayload({
      ...profile,
      items: profile.items + items
    })
  }

  function sellAllWithConfirm() {
    return new Promise(resolve => {
      Popup.open(ConfirmPopup, {
        onSubmit: () => Standoff.sellAll().then(resolve)
      })
    })
  }

  function InventoryHeader() {
    const { payload, modifyPayload, query } = useContextQuery<ReturnType<typeof getUserInventory>, null>()
    function differItemsSum(sum: number) {
      if (!payload) return

      modifyPayload(payload => payload && ({
        ...payload,
        sum: ((payload.sum + sum) <= 0) ? 0 : (payload.sum + sum)
      }))
    }
    function sellAllEvent() {
      if (!payload || !profile) return

      sellAllWithConfirm()
        .then(query)
        .then(() => differItemsSum(-payload.sum))
        .then(() => differItemsCount(-profile.items))
    }
    return (
      <BranchHeader title={trans.title} desc={profileLoading ? <Skeleton width="10em" /> : inter(trans.desc, { itemsCount: profile?.items })}>
        <Row>
          <Button onClick={sellAllEvent}>
            <span>{trans.sellAllDrops} </span>
            <span className="green-color">{payload?.sum?.toPrice()}</span>
          </Button>
          <DisplayButton defaultValue={displayFilters} onChange={setDisplayFilters}>{displayFilters ? trans.hide : trans.show} {trans.filters}</DisplayButton>
        </Row>
      </BranchHeader>
    )
  }

  return (
    <BranchSection>
      <QueryProvider unsuspend action={getUserInventory(user.id, "history", filters)}>
        <InventoryHeader />
        <CompactFilters filters={filters} onChange={setFilters} display={displayFilters} />
        <InventoryContainer differItemsCount={differItemsCount} />
        <FiltersMutation filters={filters} />
        <NotifyPopupUpdater />
      </QueryProvider>
    </BranchSection>
  )
}

function FiltersMutation({ filters }: { filters?: Partial<Filters> }) {
  const user = useSelector(state => state.user)
  const { mutate } = useContextQuery()
  useEffect(() => {
    mutate(getUserInventory(user.id, "history", filters))
  }, [filters])
  return null
}

function InventoryContainer({ differItemsCount }: { differItemsCount: (items: number) => void }) {
  type Action = ReturnType<typeof getUserInventory>
  const { loading, payload, modifyPayload } = useContextQuery<Action, null>()

  useEffect(() => {
    return ClientSocket.subscribe("WITHDRAW_UPDATE_STATUS", socketPayload => {
      updateDrop(socketPayload, socketPayload.drop_id)
      if (socketPayload.status === 7) {
        differItemsCount(-1)
      }
    })
  }, [payload])

  if (loading || !payload) {
    return (
      <BranchContainer>
        <div className="weapons-container">
          <Skeleton width="100%" height="14.75em" />
          <Skeleton width="100%" height="14.75em" />
          <Skeleton width="100%" height="14.75em" />
          <Skeleton width="100%" height="14.75em" />
          <Skeleton width="100%" height="14.75em" />
          <Skeleton width="100%" height="14.75em" />
        </div>
      </BranchContainer>
    )
  }

  function replaceDropWith(newDropData: Partial<WeaponDropProps>, dropId: number, ...drops: WeaponDropProps[]) {
    const drop = drops.find(drop => drop.id === dropId)
    if (drop) {
      const dropIndex = drops.indexOf(drop)
      drops.splice(dropIndex, 1, { ...drop, ...newDropData })
    }
    return [...drops]
  }

  function updateDrop(newDropData: Partial<WeaponDropProps>, dropId: number) {
    // console.log(arguments, "pikachu");
    modifyPayload(payload => payload && ({
      ...payload,
      items: {
        ...payload.items,
        data: replaceDropWith(newDropData, dropId, ...payload.items.data)
      }
    }))
  }

  function differItemsSum(sum: number) {
    modifyPayload(payload => payload && ({
      ...payload,
      sum: payload!.sum + sum
    }))
  }

  function callback(type: ProfileDropCallbackType, drop: WeaponDropProps) {
    // console.log(arguments, "pikachu");
    switch (type) {
      case "sold":
        differItemsSum(-drop.item.price)
        differItemsCount(-1)
        updateDrop({ status: 2 }, drop.id)
        break
      case "withdrew":
        updateDrop({ status: 6 }, drop.id)
        break

      default:
        break
    }
  }
  const drops = payload.items.data
  return (
    <BranchContainer>
      <QueryPagination use="items">
        <div className="weapons-container">
          {drops.map(drop => (
            <ProfileDrop {...drop} callback={callback} key={"drop_" + drop.id} />
          ))}
        </div>
      </QueryPagination>
      {/* {drops.length <= 0 && <Empty />} */}
    </BranchContainer>
  )
}

type WidthdrawNotifyList = getActionT<ReturnType<typeof getUserInventory>>["withdrawNotify"]

function NotifyPopupUpdater() {
  const { payload } = useContextQuery<ReturnType<typeof getUserInventory>, null>()
  const notifies = payload?.withdrawNotify
  function showNotifyPopup(drop: WidthdrawNotifyList[0]) {
    Popup.open(ErrorWithdrawCancelledPopup, {
      drop,
      closable: false
    })
  }
  useEffect(() => {
    // if (!notifies) return
    notifies?.forEach(showNotifyPopup)
    // (async () => {
    //   for await (const notify of notifies) {
    //     await showNotifyPopup(notify)
    //   }
    // })()

    return ClientSocket.subscribe("WITHDRAW_NOTIFY", socketPayload => {
      showNotifyPopup(socketPayload)
    })
  }, [notifies])
  // Socket
  // useEffect(() => {
  //   if (!payload) return

  // ClientSocket.add("WITHDRAW_NOTIFY", socketPayload => {
  //   modifyPayload({
  //     ...payload,
  //     withdrawNotify: [
  //       ...notifies || [],
  //       socketPayload
  //     ]
  //   })
  // })

  //   return () => {
  //     ClientSocket.delete("WITHDRAW_NOTIFY")
  //   }
  // }, [])
  return null
}
