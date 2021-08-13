/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import useTranslation from "resources/hooks/useTranslation"
import { inter } from "resources/utils"
import FrequentQuestions from "views/support/FrequentQuestions"
import { Article } from "../../app/components/formatting/article"
import Bonuses from "./bonuses"

export default () => {
  const bonuses = useTranslation(trans => trans.views.bonuses)
  return (
    <>
      <section className="section section--emphasize">
        <Article title={bonuses.article?.title}>
          {inter(bonuses.article?.desc)}
        </Article>
        <Bonuses />
      </section>
      <section className="section">
        <FrequentQuestions defaultQuestion="bonuses" />
      </section>
    </>
  )
}
