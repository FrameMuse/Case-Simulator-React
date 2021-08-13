/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../../assets/scss/components/selector.scss"
// STAFF
import { Component, Fragment } from "react"

interface SelectorProps<T, options = T[] | undefined> {
  choice?: number
  options?: options
  children?: options extends undefined ? never : T[]
  onSelect?(choice: T | null, choiceIndex: number | null): void
  nulish?: boolean
  minWidth?: string
  className?: string
  defaultOption?: number
  defaultToggleMenu?: boolean
}

interface SelectorState {
  choice: number | null
  displayMenu: boolean
}

export default abstract class SelectorComponent<T>
  extends Component<SelectorProps<T>, SelectorState> {
  state: SelectorState = {
    choice: this.props.defaultOption || (this.props.nulish ? null : 0),
    displayMenu: this.props.defaultToggleMenu || false
  }

  componentDidMount() {
    this.props?.onSelect?.(this.choice, this.state.choice)
  }

  componentDidUpdate(prevProps: this["props"]) {

    if (this.props.choice !== prevProps.choice) {
      // console.log(this.props.choice);
      if (this.props.choice != null) {
        this.setState({
          choice: this.props.choice
        })
      }
    }
  }

  setChoice(value: number) {
    const choice = (value === this.state.choice && this.props.nulish) ? null : value

    this.setState({ choice, displayMenu: false })

    if (this.props.onSelect) {
      if (choice === null) {
        this.props.onSelect(null, null)
      } else {
        this.props.onSelect(this.props.options?.[choice] || null, choice)
      }
    }
  }

  setDisplayMenu(displayMenu: boolean) {
    this.setState({ displayMenu })
  }

  get choice() {
    const { state, props } = this

    if (props.nulish && !state.choice) {
      return null
    }

    if (props.options) {
      return props.options[state.choice || 0]
    }

    if (props.children) {
      return props.children[state.choice || 0]
    }

    return null
  }

  abstract render(): JSX.Element
  getOption(option: any) {
    if (!option) {
      return this.choice
    }

    if (option?.props) {
      return option
    }

    return option?.toString()
  }
  renderOption(option: any) {
    return (
      <div className="selector__text">{this.getOption(option)}</div>
    )
  }
}

export function Option<C = any>(props: C) {
  return <span {...props} />
}
