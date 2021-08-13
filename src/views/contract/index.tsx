/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { Article } from "../../app/components/formatting/article"
import Features from "../../app/components/formatting/features"
import Contract from "./contract"
// SVG
import { ReactComponent as SVGIcon } from "../../assets/svg/exit.svg"
import FrequentQuestions from "views/support/FrequentQuestions"
import useTranslation from "resources/hooks/useTranslation"
// import Particles from "react-particles-js"

import asdJSON from "./asd.json"
import useRestrictedArea from "resources/hooks/useRestrictedArea"

const params = JSON.parse(JSON.stringify(asdJSON))

export default () => {

  return (
    <>
      {/* <Particles width="100%" height="100" style={{ position: "absolute" }} params={params} /> */}
      <Contract />
      {/* <Features>
        <Features.Feature title="Открывайте кейсы" icon={<SVGIcon />} />
        <Features.Feature title="Положите любые предметы в контракт" icon={<SVGIcon />} />
        <Features.Feature title="Получите рандомный предмет" icon={<SVGIcon />} />
        <Features.Feature title="Получите предмет от нашего бота или продайте сайту по цене Steam" icon={<SVGIcon />} />
      </Features> */}
      <section className="section section--1">
        <FrequentQuestions defaultQuestion="contracts" />
      </section>
    </>
  )
}