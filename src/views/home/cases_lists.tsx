/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../assets/scss/views/cases-lists.scss"
// STAFF
import CasesList from "./CasesList"
import { CasesListProps } from "../../resources/interfaces/case"
import { useSelector } from "react-redux"
import { getRandomNumber } from "../../resources/utils"

interface CasesListsProps {
  lists: CasesListProps[]
  // bonusCase: CasePreviewProps
}

function CasesLists(props: CasesListsProps) {
  const user = useSelector(state => state.user)
  const filters = useSelector(state => state.filters)

  /**
   * + Predicate for filter function
   * + Should filter themes that isn't chosen
   */
  function listsFilter(list: CasesListProps): boolean {
    if (filters.menuChoice.length > 0 && !filters.menuChoice.includes(list.theme)) {
      return false
    }

    return true
  }

  const randomNumber1 = getRandomNumber(0, props.lists.length) // Should generate a number for all lists to fit at least one

  return (
    <div className="cases-lists">
      {props.lists.map((list, index) => (
        <CasesList hidden={!listsFilter(list)} key={"cases_list_id_" + list.id} {...list} cases={list.cases} />
      ))}
    </div>
  )
}

export default CasesLists
