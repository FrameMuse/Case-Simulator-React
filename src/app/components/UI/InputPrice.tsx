/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { Component } from "react"
import { ComplicatedString } from "../../../resources/interfaces/Class"
import Price from "../../helpers/Price"
import Input from "./Input"

interface InputPriceProps {
  width?: string
  className?: string
  currency: string
  placeholder?: string
  value?: string
  defaultValue?: string
  onChange?: (price: Price) => void
}

export class InputPrice extends Component<InputPriceProps> {

  onChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (this.props.onChange) {
      const value = Number(event.target.value)
      const price = new Price(value)

      this.props.onChange(price)
    }
  }

  renderCurrency() {
    return this.props.currency
  }

  render() {
    return (
      <Input
        {...this.props}
        icon={this.renderCurrency()}
        width={this.props.width || "2.5em"}
        onChange={event => this.onChange(event)}
      />
    )
  }
}

export default InputPrice

