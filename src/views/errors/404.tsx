/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import ErrorPage from "./ErrorPage"

export default function Error404() {
  return (
    <ErrorPage errorCode="404">
      <p className="error-page__desc">
        Упс... Похоже такой страницы не сущетсвует <br />
        или она удалена
      </p>
    </ErrorPage>
  )
}
