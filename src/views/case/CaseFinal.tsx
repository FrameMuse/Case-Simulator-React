import Game from "app/components/Standoff/Game"
import { useState } from "react"
import { WeaponDropProps } from "resources/interfaces/weapon"

function CaseFinal(props: { drops: WeaponDropProps[]; onExit(): void }) {
  const [drops, setDrops] = useState(props.drops)

  function removeDrop(id: number) {
    setDrops(drops.filter(drop => drop.id !== id)) // Unsafe
  }
  function sellDrop(id: number) {
    if (drops.length <= 1) {
      props.onExit()
    } else {
      removeDrop(id)
    }
  }

  return (
    <Game.Final
      drops={drops}
      onExit={props.onExit}
      onSellDrop={sellDrop}
    />
  )
}

export default CaseFinal
