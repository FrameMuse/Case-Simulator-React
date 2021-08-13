/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../assets/scss/views/support.scss"
// STAFF
import { Article } from "../../app/components/formatting/article"
import { FAQ, FAQClause } from "../../app/components/other/FAQ"
import { ViewProps } from "../../resources/interfaces/router"
import Tickets, { TicketProps } from "./Tickets"
import SupportForm from "./SupportForm"
import { useState } from "react"
import AuthRequired from "app/components/other/AuthRequired"
import FrequentQuestions from "./FrequentQuestions"
import useTranslation from "resources/hooks/useTranslation"
import { getTicketsList } from "app/api/actions"
import { QueryProvider } from "app/components/other/MutuableQuery"

export default (props: ViewProps) => {
  const support = useTranslation(trans => trans.views.support)
  return (
    <div className="support">
      <Article title={support.title}>
        {support.desc}
      </Article>
      <div className="support-sections">
        <div className="support-sections__sidebar">
          <Article className="support-article" title={support.issues?.title}>
            {support.issues?.desc}
          </Article>

          <FAQ>
            {support.issues?.list?.map((issue, index) => (
              <FAQClause summary={issue.summary} key={"issue_" + index}>{issue.content}</FAQClause>
            ))}
          </FAQ>

        </div>
        <AuthRequired>
          <MainSection />
        </AuthRequired>
      </div>
      <FrequentQuestions defaultQuestion="upgrades" />
    </div>
  )
}

function MainSection() {
  return (
    <div className="support-sections__main">
      <QueryProvider action={getTicketsList}>
        <SupportForm />
        <Tickets />
      </QueryProvider>
    </div>
  )
}
