/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "assets/scss/components/error-page.scss"
// STAFF
import Button from "app/components/UI/Button"
import { useHistory } from "react-router"
import { classWithModifiers } from "resources/utils"
import { useEffect } from "react"

export default function ErrorPage(props: { errorCode: string | number; children: any }) {
  const history = useHistory()

  useEffect(() => {
    window.document.body.style.overflow = "hidden"

    return () => {
      window.document.body.style.overflow = ""
    }
  }, [])

  return (
    <div className={classWithModifiers("error-page", [props.errorCode])}>
      <div className="error-page__sexion">
        {props.children}
        <Button color="yellow" padding="1.5em 3.5em" onClick={() => history.push("/")}>На главную</Button>
      </div>
    </div>
  )
}
