/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { useSelector } from "react-redux"
import { classWithModifiers } from "resources/utils"
import useTranslation from "../../resources/hooks/useTranslation"
import { CasesListProps } from "../../resources/interfaces/case"
import CasePreview from "./CasePreview"

export default function CasesList(props: CasesListProps & { hidden?: boolean }) {
  const { fromToRange, search } = useSelector(state => state.filters)

  const cases = useTranslation(trans => trans.cases)
  const themeTranslation = useTranslation(trans => trans.themes[props.theme])

  /**
   * 
   * Filter predicate
   * + Drop all cases which aren't in price range
   */
  function casePriceRange(caseProps: CasesListProps["cases"][0]): boolean {
    if (!fromToRange || caseProps.price <= 0) {
      return true
    }

    if (caseProps.price < fromToRange.from) {
      return false
    }

    if (fromToRange.to && (caseProps.price > fromToRange.to)) {
      return false
    }

    return true
  }

  function caseNameSearch(caseProps: CasesListProps["cases"][0]): boolean {
    const caseTitle = cases[caseProps.id]?.["title"]?.toLowerCase() || [""]

    for (const letter of search.toLowerCase()) {
      if (!caseTitle.includes(letter)) {
        return false
      }
    }

    return true
  }

  // const filteredCases = props.cases.filter(dropZeroPrice).filter(casePriceRange).filter(caseNameSearch)
  const filteredCases = props.cases.filter(Case => caseNameSearch(Case) && casePriceRange(Case))
  return (
    <div className={classWithModifiers("cases-list", [props.theme])} hidden={props.hidden || filteredCases.length <= 0}>
      <div className="cases-list__header">
        <h2 className="cases-list__title">{themeTranslation.title}</h2>
        <p className="cases-list__desc">{themeTranslation.desc}</p>
      </div>
      <div className="cases-list__container">
        {props.cases.map(Case => {
          const caseTranslation = cases[Case.id]
          const shoudBeDisplayed = caseNameSearch(Case) && casePriceRange(Case)
          return (
            <CasePreview hidden={!shoudBeDisplayed} key={"case_preview_" + Case.id} title={caseTranslation?.title || ""} {...Case} />
          )
        })}
      </div>
    </div>
  )
}
