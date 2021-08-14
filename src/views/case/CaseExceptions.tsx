/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { getCasePage } from "app/api/actions"
import { Article } from "app/components/formatting/article"
import { TimerCountDown } from "app/components/UI/Timer"
import { useContextQuery } from "app/components/other/MutuableQuery"
import AuthRequired from "app/components/other/AuthRequired"
import useTranslation from "resources/hooks/useTranslation"

export function UnAuthException() {
  const trans = useTranslation(trans => trans.views.case.exceptions)
  return (
    <div className="case-page-exception">
      <Article className="case-page-exception-article" title={trans.unauthed?.title}>
        <em>
          {trans.unauthed?.desc}
        </em>
      </Article>
      <AuthRequired onlyButton padding="1.5em 5.5em" />
    </div>
  )
}
export function InSufficientBalanceException(props: { cost: number }) {
  const trans = useTranslation(trans => trans.views.case.exceptions)

  return (
    <div className="case-page-exception">
      <Article className="case-page-exception-article" title="da">
        <em>{trans.insufficient?.desc}</em>
      </Article>
    </div>
  )
}
export function LimitException() {
  const { payload } = useContextQuery<ReturnType<typeof getCasePage>>()
  const trans = useTranslation(trans => trans.views.case.exceptions)
  return (
    <div className="case-page-exception">
      <Article className="case-page-exception-article" title={trans.limit?.title}>
        <em>
          <TimerCountDown distance={payload.case.time} />
        </em>
      </Article>
    </div>
  )
}
