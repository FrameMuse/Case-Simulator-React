/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../assets/scss/views/terms-contacts.scss"
// STAFF
import Branch, { BranchContainer, BranchHeader, BranchSection } from "../../app/components/formatting/branch"
import useTranslation from "resources/hooks/useTranslation"

export default function TermsAndContacts() {
  const trans = useTranslation(trans => trans.views.privacy)
  return (
    <Branch className="privacy">
      <BranchSection>
        <BranchHeader title={trans.title}>
          <p>
            <span className="blue-color">{trans.updated_at} 05.06.2019</span>
          </p>
        </BranchHeader>
        <BranchContainer>
          <p style={{ whiteSpace: "pre-line" }}>
            <h3>{trans.article1?.title}</h3>
            {trans.article1?.lines}
            <h3>{trans.article2?.title}</h3>
            {trans.article2?.lines}
            <h3>{trans.article3?.title}</h3>
            {trans.article3?.lines}
            <h3>{trans.article4?.title}</h3>
            {trans.article4?.lines}
          </p>
        </BranchContainer></BranchSection>
    </Branch>
  )
}
