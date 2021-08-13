/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { classWithModifiers } from "../../../resources/utils"

export default function Icon({ name = "" }) {
  return <span className={classWithModifiers("icon", name ? [name] : [])} />
}
