/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../../assets/scss/popups/withdraw.scss"
// STAFF
import { ReactElement } from "react"

export function BulletPointsContainer({ children }: { children?: ReactElement<HTMLElement>[]; }) {
  return (
    <div className="bullet-points">
      {children?.map((child, index) => (
        <div className="bullet-points__point" key={index}>
          <div className="bullet-points__circle">
            <span className="bullet-points__index">{index}</span>
          </div>
          <div className="bullet-points__container">
            {child.props.title && <div className="bullet-points__title">{child.props.title}</div>}
            <p className="bullet-points__desc">{child.props.children}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
