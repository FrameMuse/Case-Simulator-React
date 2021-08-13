/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SVG
// STAFF
import SelectorComponent from "./SelectorComponent"
import { classAssign, classWithModifiers } from "../../../resources/utils"

export default class SelectorPoints<T = any> extends SelectorComponent<T> {
  render() {
    const { state, props } = this
    return (
      <div className={classAssign(["selector", props.className])}>
        <div className="selector__menu">
          {(props.options || props.children)?.map((option, index) => (
            <div
              className={classWithModifiers("selector__option", [state.choice === index ? "active" : ""])}
              onClick={() => this.setChoice(index)}
              key={"option_" + index}
            >
              {this.renderOption(option)}
            </div>
          ))}
        </div>
      </div>
    )
  }
}
