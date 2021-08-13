/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { ComplicatedString } from "../../resources/interfaces/Class"
import { Currency } from "../../resources/interfaces/price"
import Translation from "../controllers/Translation"

export const toDemo = (demo: number) => demo.toLocaleString() + " D"
class Price extends ComplicatedString {
  public value: number
  public static currency: Currency = Translation.settings.defaultCurrency
  public static currencyDemo = false
  public constructor(amount: number) {
    super()

    this.value = amount
  }
  public static convertAndFormat(number: number, currency = true) {
    const options = {
      style: "currency",
      currency: currency ? Price.currency.name : undefined,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }
    if (this.currencyDemo) {
      return toDemo(number)
    }
    return (number * Price.currency.convertion).toLocaleString("ru", options)
  }

  public toString() {
    return Price.convertAndFormat(this.value)
  }
}

Number.prototype.toPrice = function () {
  return Price.convertAndFormat(Number(this))
}

export default Price
