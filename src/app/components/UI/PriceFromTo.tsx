/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import Input from "./Input"
// SCSS
import "../../../assets/scss/components/price-from-to.scss"
import { useEffect, useState } from "react"
import useTranslation from "resources/hooks/useTranslation"

interface PriceFromToProps {
  to?: string | number
  from?: string | number
  onChange?(data: {
    maxPrice: number
    minPrice: number
  }): void
}

export default function PriceFromTo(props: PriceFromToProps) {
  const currency = useTranslation(trans => trans.currency)

  const [to, _setTo] = useState(props.to)
  const [from, _setFrom] = useState(props.from)

  function setTo(value: number) {
    _setTo(value)
    props.onChange && props.onChange({ maxPrice: value, minPrice: +(from || 0) })
  }

  function setFrom(value: number) {
    _setFrom(value)
    props.onChange && props.onChange({ maxPrice: +(to || 0), minPrice: value })
  }

  useEffect(() => _setTo(props.to), [props.to])
  useEffect(() => _setFrom(props.from), [props.from])

  return (
    <div className="price-from-to">
      <span className="price-from-to__text">от</span>
      <Input width="2.5em" icon={currency.symbol} value={from} onChange={event => setFrom(Number(event.target.value))} />
      <span className="price-from-to__text">до</span>
      <Input width="2.5em" icon={currency.symbol} value={to} onChange={event => setTo(Number(event.target.value))} />
    </div>
  )
}
