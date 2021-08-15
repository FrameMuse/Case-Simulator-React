/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import DataBase from "database"
import { Fragment } from "react"
import Banners from "./banners"
import CasesList from "./CasesList"

export default () => {
  return (
    <Fragment>
      <Banners />
      <Fragment>
        {/* <div className="home-filters">
          <Filters />
          <Menu themes={["asd"]} defaultTopic="summer_pack" />
        </div> */}
        {/* <section className="section section--1"> */}
        <CasesList id={1} theme="asd" cases={DataBase.data.Cases} />
      </Fragment>
    </Fragment>
  )
}
