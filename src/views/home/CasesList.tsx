/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { memo, useMemo } from "react"
import { useSelector } from "react-redux"
import { classWithModifiers } from "resources/utils"
import useTranslation from "../../resources/hooks/useTranslation"
import { CasePreviewProps, CasesListProps } from "../../resources/interfaces/case"
import CasePreview from "./CasePreview"

export default function CasesList(props: CasesListProps & { hidden?: boolean }) {
  const modes = useSelector(state => state.modes)
  const { fromToRange, search } = useSelector(state => state.filters)

  const cases = useTranslation(trans => trans.cases)
  const themeTranslation = useTranslation(trans => trans.themes[props.theme])

  function dropFreeAndBonusCases(caseProps: CasePreviewProps) {
    if (modes.demo) {
      if (caseProps.price <= 0) return false
      if (caseProps.payForBonus) return false
    }

    return true
  }

  /**
   * 
   * Filter predicate
   * + Drop all cases which aren't in price range
   */
  function casePriceRange(caseProps: CasePreviewProps): boolean {
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

  function caseNameSearch(caseProps: CasePreviewProps): boolean {
    const caseTitle = cases[caseProps.id]?.["title"]?.toLowerCase() || [""]

    for (const letter of search.toLowerCase()) {
      if (!caseTitle.includes(letter)) {
        return false
      }
    }

    return true
  }

  // const filteredCases = props.cases.filter(dropZeroPrice).filter(casePriceRange).filter(caseNameSearch)
  const filteredCases = props.cases.filter(Case => caseNameSearch(Case) && casePriceRange(Case) && dropFreeAndBonusCases(Case))
  return (
    <div className={classWithModifiers("cases-list", [props.theme])} hidden={props.hidden || filteredCases.length <= 0}>
      <div className="cases-list__header">
        <h2 className="cases-list__title">{themeTranslation.title}</h2>
        <p className="cases-list__desc">{themeTranslation.desc}</p>
      </div>
      <div className="cases-list__container">
        {props.cases.map(caseProps => {
          const caseTranslation = cases[caseProps.id]
          const shoudBeDisplayed = caseNameSearch(caseProps) && casePriceRange(caseProps) && dropFreeAndBonusCases(caseProps)
          return (
            <CasePreview hidden={!shoudBeDisplayed} key={"case_preview_" + caseProps.id} {...caseTranslation} {...caseProps} />
          )
        })}
      </div>
    </div>
  )
}
