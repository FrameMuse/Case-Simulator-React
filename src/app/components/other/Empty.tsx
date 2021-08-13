/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../../assets/scss/components/error.scss"
// STAFF
import useTranslation from "resources/hooks/useTranslation"
import Button from "../UI/Button"
import BrowserHistory from "resources/stores/BrowserHistory"

export default function Empty({ children, onClick, link }: { children?: string; onClick?: () => void; link?: string }) {
  const trans = useTranslation(trans => trans.general.emptyBlock)
  return (
    <div className="error">
      <div className="error__title">{trans.title}</div>
      <div className="error__desc">{trans.desc}</div>
      {/* {children && <p className="error__desc">{children}</p>} */}
      <Button color="green" padding="1.25em 2em" onClick={() => onClick?.() || BrowserHistory.push(link || "/")}>{children || trans.defaultButton}</Button>
    </div>
  )
}
