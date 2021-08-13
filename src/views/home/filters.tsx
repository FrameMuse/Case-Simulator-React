/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../assets/scss/views/filters.scss"
// SVG
import { ReactComponent as SVGSearch } from "../../assets/svg/search.svg"
// STAFF
import { PriceRange } from "../../app/helpers/PriceRange"
import Input from "../../app/components/UI/Input"
import useTranslation from "../../resources/hooks/useTranslation"
import { useDispatch, useSelector } from "react-redux"
import { setFilter } from "../../resources/reducers/filters"
import SelectorPoints from "../../app/components/UI/SelectorPoints"
import Search from "app/components/UI/Search"

function Filters() {
  const dispatch = useDispatch()
  const filters = useSelector(state => state.filters)
  const views = useTranslation(trans => trans.views)
  return (
    <div className="filters">
      <div className="filters__inner">
        <Search
          width="20vw"
          className="filters__filter"
          value={filters.search}
          onChange={event => dispatch(setFilter("search", event.target.value))}
        />
        <SelectorPoints
          nulish
          className="filters__filter"
          onSelect={option => dispatch(setFilter("fromToRange", option))}
          options={[
            new PriceRange(1, 19),
            new PriceRange(20, 49),
            new PriceRange(50, 99),
            new PriceRange(100)
          ]}
        />
        {/* <Checkbox
          className="filters__filter"
          label={views.home.filters.checkbox}
        /> */}
      </div>
    </div>
  )
}

export default Filters
