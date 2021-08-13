/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SVG
import { ReactComponent as SVGChevron } from "../../../assets/svg/chevron-left.svg"
// STAFF
import SelectorComponent from "./SelectorComponent"
import { classAssign, classWithModifiers } from "../../../resources/utils"

export default class SelectorList<T = any> extends SelectorComponent<T> {
  render() {
    const { state, props } = this
    return (
      <div className={classAssign(["selector", props.className])}>
        <div className="selector__current" style={{ minWidth: props.minWidth }} onClick={() => this.setDisplayMenu(!state.displayMenu)}>
          {this.renderOption(this.choice)}
          <div className="selector__icon">
            <SVGChevron className={classWithModifiers("svg-chevron", [state.displayMenu ? "up" : "down"])} />
          </div>
        </div>
        <div className={classWithModifiers("selector__menu", ["list", state.displayMenu && "display"])}>
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
