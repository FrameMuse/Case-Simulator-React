/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCCS
import "../../../assets/scss/components/lang-selector.scss"
// STAFF
import { useDispatch } from "react-redux"
import Translation from "../../controllers/Translation"
import useTranslation from "../../../resources/hooks/useTranslation"
import { RegularObject } from "../../../resources/interfaces/Object"
import { updateLang } from "app/redux/reducers/translation"
import { useState } from "react"
import { classWithModifiers } from "../../../resources/utils"

function LangSelector() {
  const dispatch = useDispatch()
  const translation = useTranslation()

  const [show, setShow] = useState(false)

  const langs = Translation.settings.langs as RegularObject
  const setLang = (lang: string) => dispatch(updateLang(lang))

  const activeLang = (translation?.langCode)?.toLowerCase() || ""
  const flagImagePath = (lang: string) => "/assets/images/icons/" + lang + ".png"

  return (
    <div className="lang-selector" onClick={() => setShow(!show)}>
      <div className="lang-selector__current">
        <img src={flagImagePath(activeLang)} alt={translation.langCode + " flag"} className="lang-selector__flag" />
        <span className="lang-selector__lang">{translation.langCode}</span>
      </div>
      <div className={classWithModifiers("lang-selector__menu", [show ? "active" : null])}>
        {Object.keys(langs).map(lang => lang !== activeLang && (
          <div className="lang-selector__option" onClick={() => setLang(lang)} key={"lang_" + lang}>
            <img src={flagImagePath(lang)} alt={lang + " flag"} className="lang-selector__flag" />
            <span className="lang-selector__lang">{lang}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LangSelector
