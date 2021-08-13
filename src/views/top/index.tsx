/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../assets/scss/views/top.scss"
// STAFF
import { ViewProps } from "../../resources/interfaces/router"
import { Article } from "../../app/components/formatting/article"
import FrequentQuestions from "views/support/FrequentQuestions"
import useTranslation from "resources/hooks/useTranslation"
import { classWithModifiers } from "resources/utils"
import { useState } from "react"
import TopBoard from "./TopBoard"
import { TotalTop } from "./TotalTop"
import DailyPrize from "./DailyPrize"
import MutuableQuery from "app/components/other/MutuableQuery"
import { fetchDailyTop, fetchTotalTop } from "app/api/actions"
// import CSSTransition from "react-transition-group"

export default (props: ViewProps) => {
  const top = useTranslation(trans => trans.views.top)
  const [page, setPage] = useState<"common" | "daily">("common")
  return (
    <>
      <section className="section section--emphasize">
        <Article title={top.article?.title}>
          {top.article?.desc}
        </Article>
        <div className="top">
          <div className="switch-content-menu">
            <div className={classWithModifiers("switch-content-menu__link", [page === "common" && "active"])} onClick={() => setPage("common")}>
              <div className="switch-content-menu__text">{top.tops?.common}</div>
            </div>
            <div className={classWithModifiers("switch-content-menu__link", [page === "daily" && "active"])} onClick={() => setPage("daily")}>
              <div className="switch-content-menu__text">{top.tops?.daily}</div>
            </div>
          </div>
          <MutuableQuery requireAuth animated action={page === "common" ? fetchTotalTop : fetchDailyTop}>
            {({ payload }) => {
              if (page === "daily") {
                return <DailyPrize />
              }

              return <TotalTop users={payload.users} />
            }}
          </MutuableQuery>
        </div>
      </section>
      <section className="section">
        <MutuableQuery requireAuth animated action={page === "common" ? fetchTotalTop : fetchDailyTop}>
          {({ payload }) => (
            <TopBoard {...payload} />
          )}
        </MutuableQuery>
      </section>
      <section className="section">
        <FrequentQuestions defaultQuestion="top" />
      </section>
    </>
  )
}
