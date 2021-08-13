/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import AuthRequired from "app/components/other/AuthRequired"
import { QueryProvider, useContextQuery } from "app/components/other/MutuableQuery"
import { QueryPagination } from "app/features/Query/QueryPagination"
import RaritySelector from "app/components/Standoff/RaritySelector"
import DisplayButton from "app/components/UI/DisplayButton"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useTranslation from "resources/hooks/useTranslation"
import { addNotify } from "resources/reducers/errors-stack"
import { inter } from "resources/utils"
import { CompactFilters } from "views/profile/inventory"
import { getUserInventory, fetchUpgradesList } from "../../app/api/actions"
import Branch, { BranchContainer, BranchHeader, BranchSection, BranchSidebar } from "../../app/components/formatting/branch"
import Loader from "../../app/components/other/Loader"
import { InventoryContainer } from "../../app/components/Standoff/LocalInventory"
import { WeaponProps } from "../../app/components/Standoff/Weapon"
import WeaponList from "../../app/components/Standoff/WeaponList"
import Skeleton from "../../app/skeletons/skeleton"
import { Filters } from "../../resources/interfaces/game"
import { WeaponDropProps, WeaponItemProps, WeaponRarity } from "../../resources/interfaces/weapon"

export default (props: { setChance: React.Dispatch<React.SetStateAction<number>> }) => {
  const user = useSelector(state => state.user)
  return (
    <Branch>
      <BranchSidebar className="upgrade-sidebar">
        <AuthRequired>
          <QueryProvider unsuspend action={getUserInventory(user.id, "active")}>
            <Inventory />
          </QueryProvider>
        </AuthRequired>
      </BranchSidebar>
      <QueryProvider unsuspend action={fetchUpgradesList({})}>
        <Upgrades {...props} />
      </QueryProvider>
    </Branch>
  )
}

function Inventory() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [drop, setDrop] = useState<WeaponDropProps | null>(null)
  const { loading, payload, mutate } = useContextQuery<ReturnType<typeof getUserInventory>>()
  const upgrade = useTranslation(trans => trans.views.upgrade)

  function setInventoryDrop(drop: WeaponDropProps) {
    if (drop.item.price < 10) {
      dispatch(addNotify("minPrice", "error", (10).toPrice()))
      return
    }

    setDrop(drop)
    dispatch({
      type: "UPDATE/SET",
      payload: {
        drop
      }
    })
  }

  function setRarity(rarity: WeaponRarity) {
    mutate(getUserInventory(user.id, "active", { rarity }))
  }

  return (
    <>
      <BranchHeader type="small" desc={(loading || !payload) ? <Skeleton width="10em" /> : (inter(upgrade.inventory?.desc, { itemsCount: payload.items.total }))} title={upgrade.inventory?.title1}>
        <RaritySelector onSelect={setRarity} />
      </BranchHeader>
      <BranchContainer>
        {(loading || !payload) ? (
          <Loader />
        ) : (
          <InventoryContainer filter={drop => drop.item.price >= 0.2} exept={[drop?.id || 0]} action={[upgrade.inventory?.action || "", setInventoryDrop]} />
        )}
      </BranchContainer>
    </>
  )
}

function Upgrades({ setChance }: { setChance: React.Dispatch<React.SetStateAction<number>> }) {
  const dispatch = useDispatch()

  const drop = useSelector(state => state.upgrade.drop)
  const trans = useTranslation(trans => trans.views.upgrade)
  const [weapon, setWeapon] = useState<WeaponItemProps | null>(null)
  const [filters, setFilters] = useState<Partial<Filters>>()
  const [displayFilters, setDisplayFilters] = useState(true)
  const { loading, payload, mutate } = useContextQuery<ReturnType<typeof fetchUpgradesList>>()

  function setUpgradeWeapon(weapon: WeaponProps) {
    setWeapon(weapon.item)
    dispatch({
      type: "UPDATE/SET",
      payload: {
        weapon: weapon.item
      }
    })
  }

  useEffect(() => payload && setChance(payload.bonus_chance), [payload])
  useEffect(() => {
    if (!drop) return
    const { price } = drop.item
    const chance = payload.bonus_chance || 1
    const minPrice = (price * 1.35)
    setFilters(filters => ({
      ...filters,
      minPrice: +(minPrice + (minPrice / chance)).toFixed(2),
      // maxPrice: price * 3.5,
    }))
  }, [drop])
  useEffect(() => {
    mutate(fetchUpgradesList(filters))
  }, [filters])

  return (
    <BranchSection>
      <BranchHeader title={trans.inventory?.title2} desc={loading ? <Skeleton width="10em" /> : inter(trans.inventory?.desc, { itemsCount: payload?.count })}>
        <DisplayButton defaultValue={true} onChange={setDisplayFilters}>{displayFilters ? trans.hide : trans.show} {trans.filters}</DisplayButton>
      </BranchHeader>
      <CompactFilters filters={filters} onChange={setFilters} display={displayFilters} />
      <BranchContainer>
        {loading && (
          <div className="weapons-container">
            <Skeleton width="100%" height="14.75em" />
            <Skeleton width="100%" height="14.75em" />
            <Skeleton width="100%" height="14.75em" />
            <Skeleton width="100%" height="14.75em" />
            <Skeleton width="100%" height="14.75em" />
            <Skeleton width="100%" height="14.75em" />
          </div>
        )}
        {!loading && payload && (
          <QueryPagination use="items">
            <WeaponList exept={[weapon?.id || 0, (drop?.item?.id || 0)]} action={[trans.inventory?.action || "", setUpgradeWeapon]} items={payload.items.data} />
          </QueryPagination>
        )}
      </BranchContainer>
    </BranchSection>
  )
}
