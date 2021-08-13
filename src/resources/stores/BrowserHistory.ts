/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { createBrowserHistory } from "history"

export default createBrowserHistory({
  /* pass a configuration object here if needed */
})

export const ProfileHistory = createBrowserHistory({
  basename: "/profile/"
})