/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { Link } from "react-router-dom"
import { CasePreviewProps } from "../../resources/interfaces/case"

export default function CasePreview(props: CasePreviewProps & { hidden?: boolean }) {
  // const caseTrans = useTranslation(trans => trans.views.case)
  return (
    <div className="case-preview" hidden={props.hidden}>
      <div className="case-preview__image-section">
        <img src={"/assets/images/cases/id_" + props.id + ".png"} alt={"Case " + props.title} className="case-preview__image" />
      </div>
      <div className="case-preview__title">{props.title || "unnamed > " + props.id}</div>
      <div className="case-preview__bottom">
        {Boolean(props.price) && (
          <div className="case-preview__price">
            <span className="case-preview__text">{props.price.toPrice()}</span>
          </div>
        )}
      </div>
      <Link className="ghost" to={"/case/" + props.id} />
    </div >
  )
}
