/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../../assets/scss/components/checkbox.scss"
// SVG
import { ReactComponent as SVGCheckmark } from "../../../assets/svg/checkmark.svg"

interface CheckboxProps {
  label?: string | number;
  required?: boolean;
  className?: string;
  defaultState?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void | undefined;
}
function Checkbox(props: CheckboxProps) {
  const inputProps = { ...props }
  delete inputProps.label
  delete inputProps.className
  return (
    <label className={props.className ? "checkbox " + props.className : "checkbox"}>
      <input {...inputProps} type="checkbox" className="checkbox__input" />
      <div className="checkbox__inner">
        <div className="checkbox__icon">
          <SVGCheckmark />
        </div>
      </div>
      {props.label && <span className="checkbox__label">{props.label}</span>}
    </label>
  )
}

export default Checkbox
