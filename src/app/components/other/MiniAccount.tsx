/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../../assets/scss/components/mini-account.scss"
// STAFF
import { ClientAPI } from "app/api/client"
import { fetchGetDemo } from "app/api/actions"
import store from "app/redux/store"
import { addNotify } from "app/redux/reducers/errors-stack"

export function getDemo() {
  ClientAPI
    .query(fetchGetDemo)
    .then(({ error }) => {
      if (error) return
      store.dispatch(addNotify("recievedDemo", "success"))
    })
}
