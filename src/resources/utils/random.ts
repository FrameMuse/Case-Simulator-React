/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

export function randomInt(min: number, max: number) {
  return min + Math.floor((max - min) * Math.random())
}

export function randomFloat(min: number, max: number) {
  return min + (max - min) * Math.random()
}
