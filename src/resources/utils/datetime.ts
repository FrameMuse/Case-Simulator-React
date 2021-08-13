/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

export function toLocaleDateTime(date: Date | string | number, onlyDate?: boolean) {
  const DateTime = new Date(date).toLocaleString()

  return onlyDate ? DateTime.split(",")[0] : DateTime
}
