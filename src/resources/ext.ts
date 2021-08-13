/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { toLocaleDateTime } from "./utils/datetime"

Date.prototype.toLocaleDateTime = function (onlyDate?: boolean) {
  return toLocaleDateTime(this, onlyDate)
}

String.prototype.toLocaleDateTime = function (onlyDate?: boolean) {
  return toLocaleDateTime(this as string, onlyDate)
}

Number.prototype.toLocaleDateTime = function (onlyDate?: boolean) {
  return toLocaleDateTime(this as number, onlyDate)
}
