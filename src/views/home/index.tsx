/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { Fragment } from "react"
import { getCases } from "../../app/api/actions"
import MutuableQuery from "../../app/components/other/MutuableQuery"
import useMutableQuery from "../../resources/hooks/useCacheQuery"
import Banners from "./banners"
import CasesLists from "./cases_lists"
import Filters from "./filters"
import Menu from "./menu"

export default () => {
  return (
    <Fragment>
      <Banners />
      <MutuableQuery action={getCases} >
        {({ payload }) => (
          <Fragment>
            <div className="home-filters">
              <Filters />
              <Menu themes={payload.themes} defaultTopic="summer_pack" />
            </div>
            {/* <section className="section section--1"> */}
            <CasesLists {...payload} />
            {/* </section> */}
          </Fragment>
        )}
      </MutuableQuery>
    </Fragment>
  )
}
