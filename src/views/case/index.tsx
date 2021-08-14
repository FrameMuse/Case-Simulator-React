/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../assets/scss/views/case.scss"
// STAFF
import { Article } from "app/components/formatting/article"
import { ViewProps } from "../../resources/interfaces/router"
import { getCasePage } from "app/api/actions"
import useTranslation from "../../resources/hooks/useTranslation"
import { QueryProvider } from "app/components/other/MutuableQuery"
import { useEffect, useState } from "react"
import { classWithModifiers } from "../../resources/utils"
import ClientSocket from "app/socket/ClientSocket"

export default (props: ViewProps<{ caseId: number, isBonus?: boolean }>) => {
  const { caseId, isBonus } = props.match.params

  const casePageTrans = useTranslation(trans => trans.views.case)
  const caseTranslation = useTranslation(trans => trans.cases[caseId])

  const [multiplier, setMultiplier] = useState(1)

  useEffect(() => {
    return () => {
      ClientSocket.emit("LIVE_FEED_RELEASE")
    }
  }, [])

  return (
    <QueryProvider action={getCasePage(caseId)}>
      <div className="case">
        <Article title={caseTranslation.title} type="center" className="case-page-article">
          {caseTranslation.desc}
        </Article>
        {/* <CaseContainer setMultiplier={setMultiplier} /> */}
      </div>
    </QueryProvider>
  )
}

interface CaseBenefitProps {
  symbol: string
  color?: "orange" | "green"
  children: any
}

function CaseBenefit(props: CaseBenefitProps) {
  return (
    <div className="case-benefits__benefit">
      <div className={classWithModifiers("case-benefits__circle", [props.color])}>
        <span className="case-benefits__symbol">{props.symbol}</span>
      </div>
      <span className="case-benefits__desc">{props.children}</span>
    </div>
  )
}
