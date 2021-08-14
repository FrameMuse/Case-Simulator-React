/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { Fragment } from "react"
import Banners from "./banners"
import CasesLists from "./cases_lists"
import Filters from "./filters"
import Menu from "./menu"

export default () => {
  return (
    <Fragment>
      <Banners />
      <Fragment>
        <div className="home-filters">
          <Filters />
          <Menu themes={[]} defaultTopic="summer_pack" />
        </div>
        {/* <section className="section section--1"> */}
        <CasesLists lists={[]} />
        {/* </section> */}
      </Fragment>
    </Fragment>
  )
}
