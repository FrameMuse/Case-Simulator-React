/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "assets/scss/views/contract.scss"
// IMAGES
import { ReactComponent as SVGArrow } from "assets/svg/arrow.svg"
// STAFF
import Branch, { BranchContainer, BranchSection, BranchSidebar } from "../../app/components/formatting/branch"
import RaritySelector from "../../app/components/Standoff/RaritySelector"
import Button from "../../app/components/UI/Button"
import Weapon from "../../app/components/Standoff/Weapon"
import { fetchMaxContractDrop, getUserInventory, postCreateContract } from "../../app/api/actions"
import { WeaponDropProps, WeaponRarity } from "../../resources/interfaces/weapon"
import { useEffect, useState } from "react"
import { ClientAPI } from "../../app/api/client"
import If from "../../app/components/UI/If"
import useTranslation from "../../resources/hooks/useTranslation"
import { InventoryContainer } from "../../app/components/Standoff/LocalInventory"
import Skeleton from "../../app/skeletons/skeleton"
import { useDispatch, useSelector } from "react-redux"
import { classWithModifiers, getWeaponImage, inter } from "../../resources/utils"
import { CreateContractRequest } from "../../app/api/requests"
import Standoff from "../../app/controllers/Standoff"
import useMutableQuery from "resources/hooks/useCacheQuery"
import Loader from "app/components/other/Loader"
import Error from "app/components/other/Error"
import Game from "app/components/Standoff/Game"
import { Article } from "app/components/formatting/article"
import LevelImage from "app/components/UI/LevelImage"
import WeaponImage from "app/components/Standoff/WeaponImage"
import CanvasDrawing from "./CanvasDrawing"
import AuthRequired from "app/components/other/AuthRequired"
import useAddNotify from "resources/hooks/useAddNotify"
import { QueryProvider, useContextQuery } from "app/components/other/MutuableQuery"
import SoundController from "app/controllers/SoundController"

function useContractSlots() {
  const dispatch = useDispatch()
  const addNotify = useAddNotify()

  const slots = useSelector(state => state.contracts)
  const mockSlots: (WeaponDropProps | null)[] = [...slots, ...Array(8 - slots.length)]

  function add(...drops: WeaponDropProps[]) {
    dispatch({
      type: "CONTRACT/ADD",
      payload: drops
    })
  }

  function remove(...drops: WeaponDropProps[]) {
    dispatch({
      type: "CONTRACT/REMOVE",
      payload: drops.map(drop => drop.id)
    })
  }

  function clear() {
    if (slots.length > 0) {
      addNotify("itemsCleared", "success")
    } else {
      addNotify("nothingToClear")
    }

    dispatch({ type: "CONTRACT/CLEAR" })
  }

  return { slots, mockSlots, add, remove, clear }
}

function Contract() {
  const user = useSelector(state => state.user)
  const contract = useTranslation(trans => trans.views.contract)
  const { clear } = useContractSlots()
  return (
    <Branch className="contract">
      <BranchSidebar style={{ width: "40em" }}>
        <AuthRequired>
          <QueryProvider unsuspend action={getUserInventory(user.id, "active")}>
            <ContractSidebar />
          </QueryProvider>
        </AuthRequired>
      </BranchSidebar>
      <BranchSection>
        <div className="branch__header">
          <Article className="branch-article" title={contract.article?.title}>
            {inter(contract.article?.desc)}
          </Article>
          <Button onClick={clear}>
            <em>{contract.clearSlots}</em>
          </Button>
        </div>
        <ContractSwitchContent />
      </BranchSection>
    </Branch>
  )
}

function ContractSidebar() {
  const user = useSelector(state => state.user)
  const contract = useTranslation(trans => trans.views.contract)
  const { slots, add, remove } = useContractSlots()
  const { loading, payload, mutate } = useContextQuery<ReturnType<typeof getUserInventory>, null>()
  function setRarity(rarity: WeaponRarity) {
    mutate(getUserInventory(user.id, "active", { rarity }))
  }

  useEffect(() => {
    if (payload?.contractItems) {
      const slotsIds = slots.map(slot => slot.id)
      if (payload.contractItems.every(item => slotsIds.includes(item.id))) {
        return
      }

      remove(...payload.contractItems)
      add(...payload.contractItems)
    }
  }, [payload?.contractItems])

  return (
    <>
      <div className="branch__header">
        <Article className="branch-article" title={contract.sidebarTitle}>
          {(loading || !payload) ? (
            <>
              <Skeleton width="10em" />
              <Skeleton width="7.5em" />
            </>
          ) : (
            inter(contract.sidebardesc, { itemsCount: payload.items.total })
          )}
        </Article>
        <RaritySelector onSelect={setRarity} />
      </div>
      <BranchContainer>
        {payload && (
          <InventoryContainer maxHeight="59em" action={[contract.buttons?.add || "", add]} exept={slots.map(slot => slot.id)} />
        )}
        {loading && <Loader overlap />}
      </BranchContainer>
    </>
  )
}

function ContractSlots() {
  const contract = useTranslation(trans => trans.views.contract)
  const { slots, mockSlots, remove } = useContractSlots()
  return (
    <BranchContainer>
      <div className="contract-slots">
        {mockSlots.map((slot: WeaponDropProps | null, index) => (
          <div className="contract-slots__slot" key={"slot_" + index}>
            <If state={!slot}>
              <div className="contract-slots__number" key={"contract_slot_" + index}>{index + 1}</div>
            </If>
            {slot && <Weapon {...slot} action={[contract.buttons?.remove || "", () => remove(slot)]} />}
          </div>
        ))}
      </div>
      {slots.length >= 3 && <MaxPossibleDrop />}
    </BranchContainer>
  )
}

function ContractToSign() {
  const user = useSelector(state => state.user)
  const contractSign = useTranslation(trans => trans.views.contract.sign)
  const { slots, mockSlots } = useContractSlots()
  const { loading, error, payload: weapon } = useMutableQuery(fetchMaxContractDrop(slots.map(slot => slot.id)))

  if (error || weapon?.error) {
    return <Error {...weapon?.error} />
  }

  const quadIdString = ((weapon?.id || 0) / 10 ** 11).toFixed(11).replace(".", "")
  const quadIdArray = quadIdString.match(/\d{4}/g)
  return (
    <BranchContainer>
      <div className="contract-sign">
        <div className="contract-sign-header">
          <div className="contract-sign-header__heading">{contractSign.heading}</div>
          <p className="contract-sign-header__date">
            {contractSign.date}
            <br />
            {(new Date()).toLocaleDateString()}
          </p>
        </div>
        <div className="contract-sign__container">
          <div className="contract-sign__left">
            <div className="contract-sign__info">
              <div className="contract-sign__row">
                <div className="contract-sign__title">{contractSign.user}</div>
                <div className="contract-user">
                  <img src={user.photo} alt="avatar" className="contract-user__image" />
                  <span className="contract-sign__text">{user.firstname}</span>
                </div>
              </div>
              <div className="contract-sign__row">
                <div className="contract-sign__title">{contractSign.level}</div>
                <div className="contract-level">
                  <div className="contract-level__level">
                    <LevelImage level={user.lvl} />
                  </div>
                  <span className="contract-sign__text">{contractSign.level} {user.lvl}</span>
                </div>
              </div>
            </div>
            <div className="contract-sign__content">
              <div className="contract-sign__title">{contractSign.chosenItems}</div>
              <div className="contract-sign-items">
                {mockSlots.map((slot, index) => (
                  <div className="contract-sign-items__item" key={"item_" + index}>
                    <span className="contract-sign-items__index">{index + 1}.</span>
                    {slot ? (
                      <span>{slot.item.name} {slot.item.subname}</span>
                    ) : (
                      <span>{contractSign.empty}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="contract-sign__content">
              <div className="contract-sign__title">{contractSign.yourSign}</div>
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
          <div className="contract-sign__right">
            <div className="contract-sign__row contract-sign__row--0">
              <div className="contract-sign__title">{contractSign.form} #</div>
              <div className="contract-sign__text">{quadIdArray?.join("-")}</div>
            </div>
            <div className="contract-sign__content">
              <div className="contract-sign-weapon">
                <div className="contract-sign__title">{contractSign.droppedItem}</div>
                <div className="contract-sign-weapon__image">
                  <WeaponImage disabled={loading} {...weapon} />
                </div>
                <div className="contract-sign-weapon__status">{loading ? contractSign.pending : `${weapon?.name} - ${weapon?.subname}`}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="contract-sign__bottom">
          <p>{contractSign.termsDesc}</p>
        </div>
        <CanvasDrawing color="#526b80" className="contract-sign__field" />
      </div>
    </BranchContainer>
  )
}

function MaxPossibleDrop() {
  const { slots } = useContractSlots()
  const { loading, error, payload: weapon } = useMutableQuery(fetchMaxContractDrop(slots.map(slot => slot.id)))

  if (error || weapon?.error) {
    return <Error {...weapon?.error} />
  }

  return (
    <div className={classWithModifiers("contract-max-drop", [weapon?.class_name?.toLowerCase()])}>
      <div className="contract-max-drop__title">Максимальный приз</div>
      {weapon && (
        <div className="contract-max-drop__weapon">
          <div className="contract-max-drop__rarity"></div>
          <img src={getWeaponImage(weapon.id)} alt="weapon" className="contract-max-drop__image" />
        </div>
      )}
      <div className="contract-max-drop__info">
        <div className="contract-max-drop__name">
          {(!loading && weapon) ? (
            <>
              {weapon.name}
              <br />
              {weapon.subname}
            </>
          ) : <Skeleton />}
        </div>
        <div className="weapon-price contract-max-drop__price">
          {(!loading && weapon) ? weapon.price.toPrice() : <Skeleton />}
        </div>
      </div>
    </div>
  )
}

function ContractCreatePanel({ goNext }: { goNext: () => void }) {
  const { slots } = useContractSlots()
  const contract = useTranslation(trans => trans.views.contract)

  const IS_DISABLED = slots.length < 3
  const TOTAL_PRICE = slots.reduce((result, slot) => result + slot.item.price, 0)
  const MIN_DROP_PRICE = (TOTAL_PRICE / 4).toPrice()
  const MAX_DROP_PRICE = (TOTAL_PRICE * 4).toPrice()
  return (
    <BranchContainer>
      <div className="contract-create">
        <div className="contract-create__info">
          <div className="contract-column">
            <span className="contract-column__title">{contract.create?.column1?.title}</span>
            <span className="contract-column__desc">{inter(contract.create?.column1?.desc, { itemsCount: slots.length, price: TOTAL_PRICE.toPrice() })}</span>
          </div>
          <div className={classWithModifiers("contract-create-circle", [!IS_DISABLED && "active"])}>
            <SVGArrow className="contract-create-circle__arrow" />
          </div>
          <div className="contract-column">
            <span className="contract-column__title">{contract.create?.column2?.title}</span>
            <span className="contract-column__desc">{inter(contract.create?.column2?.desc, { minPrice: MIN_DROP_PRICE, maxPrice: MAX_DROP_PRICE })}</span>
          </div>
        </div>
        <Button onClick={goNext} className="contract-create__button" disabled={IS_DISABLED} color={IS_DISABLED ? "red" : "yellow"}>{IS_DISABLED ? (contract.create?.button?.error + " - " + (3 - slots.length)) : contract.create?.button?.default}</Button>
      </div>
    </BranchContainer>
  )
}

function ContractFinal({ wait }: { wait: () => void }) {
  const { slots } = useContractSlots()
  const [action] = useState(postCreateContract(slots.map(slot => slot.id)))
  const { loading, error, payload } = useMutableQuery(action)

  if (error) {
    return <Error {...payload?.error} />
  }

  if (!payload || loading) {
    return <Loader />
  }

  return (
    <Game.Final
      className="contract-final"
      drops={[payload]}
      onSellDrop={wait}
      onExit={wait}
    />
  )
}

function ContractSwitchContent() {
  const dispatch = useDispatch()
  const { slots } = useContractSlots()
  const [status, setStatus] = useState<Game.status>("waiting")

  useEffect(() => {
    if (slots.length < 3 && status !== "finished") {
      setStatus("waiting")
    }

    return () => {
      SoundController.pause("contract")
    }
  }, [slots])

  switch (status) {
    case "waiting":
      return (
        <>
          <ContractSlots />
          <ContractCreatePanel goNext={() => setStatus("running")} />
        </>
      )

    case "running":
      return (
        <>
          <ContractToSign />
          <ContractCreatePanel goNext={() => setStatus("finished")} />
        </>
      )

    case "finished":
      SoundController.play("contract")
      return (
        <ContractFinal
          wait={() => (setStatus("waiting"), dispatch({ type: "CONTRACT/CLEAR" }))}
        />
      )

    default:
      return null
  }
}

export default Contract
