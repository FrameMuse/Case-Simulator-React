/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../assets/scss/views/terms-contacts.scss"
// STAFF
import Branch, { BranchContainer, BranchHeader, BranchSection, BranchSidebar } from "../../app/components/formatting/branch"
import useTranslation from "resources/hooks/useTranslation"

export default function TermsAndContacts() {
  const trans = useTranslation(trans => trans.views.termsContacts)
  return (
    <Branch className="terms-contacts">
      <BranchSidebar style={{ width: "40em" }}>
        <BranchHeader title="Контакты" />
        <BranchContainer>
          <div className="entries-block">
            <div className="entries-block__entry">
              <span className="entries-block__key">{trans.entries?.beneficiary}</span>
              <span className="entries-block__value">CRYSTAL FUTURE OU</span>
            </div>
            <div className="entries-block__entry">
              <span className="entries-block__key">{trans.entries?.regNumber}</span>
              <span className="entries-block__value">14198230</span>
            </div>
            <div className="entries-block__entry">
              <span className="entries-block__key">{trans.entries?.beneficiaryAddress}</span>
              <span className="entries-block__value">HARJU MAAKOND, TALLINN, KESKLINNA LINNAOSA, PIKK TN 7-5, 10123</span>
            </div>
            <br />
            <div className="entries-block__entry">
              <span className="entries-block__key">{trans.entries?.domainName}</span>
              <span className="entries-block__value">standoffcase.net</span>
            </div>
            <div className="entries-block__entry">
              <span className="entries-block__key">{trans.entries?.vkGroup}</span>
              <a href="https://vk.com/standoffcase" target="_blank" rel="noreferrer noopener" className="entries-block__value">vk.com/standoffcase</a>
            </div>
            <div className="entries-block__entry">
              <span className="entries-block__key">{trans.entries?.support}</span>
              <span className="entries-block__value"><a href="mailto:yes@standoffcasesupport.ru">yes@standoffcasesupport.ru</a></span>
            </div>
          </div>
        </BranchContainer>
      </BranchSidebar >
      <BranchSection>
        <BranchHeader title="Пользовательское соглашение">
          <p>
            <span className="blue-color">{trans.updated_at} 05.06.2019</span>
          </p>
        </BranchHeader>
        <BranchContainer>
          <p>{trans.intro}</p>
        </BranchContainer>
        <BranchContainer style={{ maxHeight: "50em", overflow: "auto" }}>
          <p>
            <h3>{trans.article1?.title}</h3>
            {trans.article1?.lines}
            <h3>{trans.article2?.title}</h3>
            {trans.article2?.lines}
            <h3>{trans.article3?.title}</h3>
            {trans.article3?.lines}
            <h3>{trans.article4?.title}</h3>
            {trans.article4?.lines}
            <h3>{trans.article5?.title}</h3>
            {trans.article5?.lines}
            <h3>{trans.article6?.title}</h3>
            {trans.article6?.lines}
            <h3>{trans.article7?.title}</h3>
            {trans.article7?.lines}
            <h3>{trans.article8?.title}</h3>
            {trans.article8?.lines}
          </p>
        </BranchContainer>
      </BranchSection>
    </Branch >
  )
}
