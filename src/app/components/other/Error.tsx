/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../../assets/scss/components/error.scss"
// STAFF
import useTranslation from "resources/hooks/useTranslation"
import Button from "../UI/Button"
import { classWithModifiers } from "resources/utils"

export interface ErrorObject {
  code: number
  data?: any
}

export interface ErrorProps extends Partial<ErrorObject> {
  message?: string
  overlap?: boolean
  onClick?: () => void
}

export default function Error({ message, overlap, code, data, onClick }: ErrorProps) {
  const notifies = useTranslation(trans => trans.notifies)
  return (
    <div className={classWithModifiers("error", [overlap && "overlap"])}>
      <div className="error__title">Ошибка</div>
      {message && <p className="error__desc">{message}</p>}
      {code && (
        <p className="error__desc">
          Во время загрузки страницы <br />
          Произошла известная ошибка <span className="yellow-color">{notifies[code]?.replace("data", data)}</span>
        </p>
      )}
      <Button color="green" padding="1.25em 2em" onClick={onClick}>Повторить</Button>
    </div>
  )
}
