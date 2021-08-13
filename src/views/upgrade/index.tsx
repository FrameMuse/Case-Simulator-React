/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { Article } from "../../app/components/formatting/article"
import { ViewProps } from "../../resources/interfaces/router"
import Inventory from "./inventory"
import UpgradeMaster from "./UpgradeMaster"

// SVG
import FrequentQuestions from "views/support/FrequentQuestions"
import useTranslation from "resources/hooks/useTranslation"
import { useState } from "react"

export default (props: ViewProps) => {
  const [chance, setChance] = useState(0)
  const upgrade = useTranslation(trans => trans.views.upgrade)
  return (
    <>
      <section className="section section--emphasize">
        <Article title={upgrade.title}>
          {upgrade.desc}
        </Article>
        <UpgradeMaster chance={chance} setChance={setChance} />
      </section>
      <section className="section">
        <Inventory setChance={setChance} />
      </section>
      {/* <Features>
        <Features.Feature title="Открывайте кейсы" icon={<SVGIcon />} />
        <Features.Feature title="Положите любые предметы в контракт" icon={<SVGIcon />} />
        <Features.Feature title="Получите рандомный предмет" icon={<SVGIcon />} />
        <Features.Feature title="Получите предмет от нашего бота или продайте сайту по цене Steam" icon={<SVGIcon />} />
      </Features> */}
      <section className="section section--1">
        <FrequentQuestions defaultQuestion="upgrades" />
      </section>
    </>
  )
}
