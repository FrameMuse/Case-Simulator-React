/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { useEffect } from "react"
import useTranslation from "resources/hooks/useTranslation"
import { WeaponRarity } from "../../../resources/interfaces/weapon"
import { classWithModifiers } from "../../../resources/utils"
import { Option } from "../UI/SelectorComponent"
import SelectorList from "../UI/SelectorList"

const rarities = ["common", "uncommon", "rare", "epic", "legendary", "arcane"]

export default function RaritySelector<T = WeaponRarity | undefined>({ onSelect, choice }: { onSelect: (rarity: T) => void, choice?: number }) {
  const rarityTranslation = useTranslation(trans => trans.general.rarity)
  useEffect(() => {
    console.log(choice)

  }, [choice])
  return (
    <SelectorList<React.ReactElement<{ rarity: T }>>
      className="rarity-selector"
      minWidth="16em"
      choice={choice}
      onSelect={choice => choice && onSelect(choice.props.rarity)}
      options={[
        <Option key="default_option">
          <RarityCircle />
          {rarityTranslation.any}
        </Option>,
        ...rarities.map((rarity, index) => (
          <Option rarity={rarity} key={"option_" + index}>
            <RarityCircle color={rarity} />
            {rarityTranslation[rarity]}
          </Option>
        ))
      ]}
    />
  )
}

export function getRarityIndex(rarity: WeaponRarity) {
  return rarity.indexOf(rarity)
}

function RarityCircle({ color }: { color?: string }) {
  return <span className={classWithModifiers("rarity-selector__circle", [color])} />
}
