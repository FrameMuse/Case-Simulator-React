/* eslint-disable @typescript-eslint/no-namespace */
/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// Images
import { ReactComponent as SVGArrow } from "assets/svg/arrow.svg"
import TriangleSVG from "../../../assets/svg/triangle"
// STAFF
import { PureComponent as ReactComponent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { WeaponDropProps } from "resources/interfaces/weapon"
import { classAssign, classWithModifiers, getWeaponImage } from "resources/utils"
import Button from "../UI/Button"
import ButtonTool from "../UI/ButtonTool"
import BrowserHistory from "resources/stores/BrowserHistory"
import useTranslation from "resources/hooks/useTranslation"
import { trianglesCount } from "./Weapon"
import { SoundName } from "app/controllers/SoundController"
import store from "app/redux/store"
import ClientSocket from "app/socket/ClientSocket"

namespace Game {
  export type status = "waiting" | "running" | "finished"
  interface state {
    status: status
  }
  export abstract class Component<P = {}, S extends state = state, SS = {}> extends ReactComponent<P, S, SS> {
    // Actions
    abstract wait(): void
    abstract run(): void
    abstract finish(): void
    // Renders
    abstract render(): any
  }


  interface FinalProps {
    hint?: any
    className?: string
    playSound?: SoundName
    disableButtons?: boolean
    drops: WeaponDropProps[]
    onSellDrop(id: number): void
    onExit(): void
  }

  export function Final(props: FinalProps) {
    const trans = useTranslation(trans => trans.game.final)
    const totalPrice = props.drops.reduce((result, drop) => result + drop.item.price, 0)
    async function sellAllDrops() {
      // if (!modes.demo) {
      //   await Standoff.sell(...props.drops)
      // }
      props.onExit()
    }
    return (
      <div className={classAssign(["game-final", props.className])}>
        <FinalDropsContainer {...props} />
        <div className="game-final__bottom">
          <FinalInfo />
          <div className="game-final-info__buttons">
            <ButtonTool padding="1.5em 3.5em" keyPress={["а", "f", "Enter"]} onClick={props.onExit}>{trans.buttons?.again}</ButtonTool>
            {props.drops.length > 1 && (
              <Button padding="1.5em 3.5em" color="yellow" lazyClick={sellAllDrops}>{trans.buttons?.sellAllFor} {totalPrice.toPrice()}</Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  export function FinalInfo() {
    const trans = useTranslation(trans => trans.game.final)
    return (
      <div className="game-final-info">
        <div className="game-final-info__circle">
          <div className="game-final-info__icon">!</div>
        </div>
      </div>
    )
  }

  export function FinalDropsContainer({ drops, onSellDrop, disableButtons, playSound, hint }: FinalProps) {
    const final = useTranslation(trans => trans.game.final)

    const dispatch = useDispatch()
    const contracts = useSelector(state => state.contracts)

    const [activeDrop, setActiveDrop] = useState(getInitDrop())
    const activeDropIndex = drops.indexOf(activeDrop)

    function getInitDrop() {
      return drops[Math.trunc((drops.length - 1) / 2)]
    }

    function checkIfExists(dropIndex: number) {
      return Boolean(drops[dropIndex])
    }

    function setDrop(newIndex: number) {
      if (checkIfExists(newIndex)) {
        setActiveDrop(drops[newIndex])
      }
    }

    function nextDrop() {
      setDrop(activeDropIndex + 1)
    }

    function prevDrop() {
      setDrop(activeDropIndex - 1)
    }

    function goToContract() {
      if (contracts.includes(activeDrop)) {
        return BrowserHistory.push("/contract")
      }

      if (drops.length <= 1) {
        BrowserHistory.push("/contract")
      }

      addToContract()
    }

    function addToContract() {
      dispatch({
        type: "CONTRACT/ADD",
        payload: [activeDrop]
      })
    }

    async function sellDrop() {
      // if (!modes.demo) {
      //   await Standoff.sell(activeDrop)
      // }
      onSellDrop(activeDrop.id)
    }

    // useEffect(() => {
    //   if (!playSound) return

    //   SoundController.play(playSound)
    //   return () => {
    //     SoundController.pause(playSound)
    //   }
    // }, [playSound])

    useEffect(() => {
      setActiveDrop(getInitDrop())
    }, [drops])

    useEffect(() => {
      store.dispatch({
        type: "LOCAL_INVENTORY_UPDATE"
      })

      ClientSocket.emit("LIVE_FEED_RELEASE")
    }, [])

    const SHOW_LEFT_ARROW = activeDropIndex > 0
    const SHOW_RIGHT_ARROW = activeDropIndex < (drops.length - 1)
    return (
      <div className={classWithModifiers("game-final-drop", [activeDrop.item.class_name.toLowerCase()])} >
        <div className="game-final-drop__radial" />
        <div className="game-final-drop__smoke" />
        <div className="game-final-drop__container">
          <div className="game-final-drop__drop">
            <div className="game-final-drop__triangles">
              {[...Array(trianglesCount(activeDrop.item.class_name))].map((_, index) => (
                <TriangleSVG key={"TriangleSVG_" + index} />
              ))}
            </div>
            <div className="game-final-drop__name">{Boolean(activeDrop.item.StatTrack) && "StatTrack"} {activeDrop.item.name} {activeDrop.item.subname}</div>
            <div className="game-final-drop__skin">
              <TriangleSVG />
              <div className="game-final-drop__images" style={{ "--active-index": activeDropIndex }}>
                {drops.map(({ id, item }, index) => (
                  <img src={getWeaponImage(item.id)} alt="skin" className={classWithModifiers("game-final-drop__image", [index === activeDropIndex && "active"])} onClick={() => setDrop(index)} key={"drop_image_" + id} />
                ))}
              </div>
            </div>
          </div>
          {SHOW_LEFT_ARROW && (
            <div className="game-final-arrow game-final-arrow--left" onClick={prevDrop}>
              <div className="game-final-arrow__icon">
                <SVGArrow />
              </div>
            </div>
          )}
          {SHOW_RIGHT_ARROW && (
            <div className="game-final-arrow game-final-arrow--right" onClick={nextDrop}>
              <div className="game-final-arrow__icon">
                <SVGArrow />
              </div>
            </div>
          )}
        </div>
        {hint && (
          <div className="game-final-drop__hint">{hint}</div>
        )}
        {!disableButtons && (
          <div className="game-final-drop__buttons">
            <Button className="game-final-drop__button" lazyClick={sellDrop}>{final.buttons?.sellFor} {activeDrop.item.price.toPrice()}</Button>
            <Button className={classWithModifiers("game-final-drop__button", [contracts.includes(activeDrop) && "yellow"])} onClick={goToContract}>
              {contracts.includes(activeDrop) ? final.buttons?.inContracts : final.buttons?.addToContract}
            </Button>
          </div>
        )}
      </div>
    )
  }
}

export default Game
