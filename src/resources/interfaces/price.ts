/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

export interface Currency {
  name: string
  symbol: string
  convertion: number
}

export interface PriceString {
  toString: () => string
}
