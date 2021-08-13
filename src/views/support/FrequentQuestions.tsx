import { Article } from "../../app/components/formatting/article"
import { FAQ, FAQClause } from "../../app/components/other/FAQ"
import SwitchContent, { SwitchContentRoute } from "../../app/components/other/SwitchContent"
import useTranslation from "resources/hooks/useTranslation"
import { TranslationJSON, TranslationJSONRaw } from "app/controllers/Translation"

export default function FrequentQuestions({ defaultQuestion }: { defaultQuestion: keyof TranslationJSONRaw["frequentQuestions"]["pages"] }) {
  const frequentQuestions = useTranslation(trans => trans.frequentQuestions)
  const pagesTrans = frequentQuestions.pages
  if (!pagesTrans) {
    console.error("Not translated - frequentQuestions?.pages")
    return null
  }
  const pages = Object.keys(pagesTrans).map(page => pagesTrans[page])
  return (
    <div className="frequent-questions">
      <Article title={frequentQuestions.article?.title}>
        {frequentQuestions.article?.desc}
      </Article>
      <div className="frequent-questions__container">
        <SwitchContent type="dependent" menu={pages.map(page => page?.title)} defaultValue={pagesTrans[defaultQuestion]?.title}>
          {pages.map((page, index) => (
            <SwitchContentRoute path={page.title} key={"FQ_page_" + index}>
              <FAQ>
                {page.questions.map((question, index) => (
                  <FAQClause summary={question.question} key={"FAQ_clause_" + index}>
                    {question.answer}
                  </FAQClause>

                ))}
              </FAQ>
            </SwitchContentRoute>
          ))}
        </SwitchContent>
      </div>
    </div>
  )
}
