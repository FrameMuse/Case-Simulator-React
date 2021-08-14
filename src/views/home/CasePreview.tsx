/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import Icon from "app/components/UI/Icon"
import { Link } from "react-router-dom"
import Hint from "app/components/UI/Hint"
import { CasePreviewProps } from "../../resources/interfaces/case"
import { getCaseImage } from "../../resources/utils"
import { classWithModifiers } from "react-nuts/src/utils"

export default function CasePreview(props: CasePreviewProps & { hidden?: boolean }) {
  // const caseTrans = useTranslation(trans => trans.views.case)
  return (
    <div className={classWithModifiers("case-preview", Boolean(props.payForBonus) && "bonus")} hidden={props.hidden}>
      <div className="case-preview__image-section">
        <img src={getCaseImage(props.id)} alt={"Case " + props.title} className="case-preview__image" />
      </div>
      <div className="case-preview__title">{props.title || "unnamed > " + props.id}</div>
      <div className="case-preview__bottom">
        {Boolean(props.price) && (
          <div className="case-preview__price">
            <span className="case-preview__text">{props.price.toPrice()}</span>
          </div>
        )}
        {Boolean(props.oldPrice) && (
          <div className="case-preview__old-price">
            <span className={classWithModifiers("case-preview__text", "dark")}>{props.oldPrice.toPrice()}</span>
          </div>
        )}
        {Boolean(props.payForBonus) && (
          <div className="case-preview__bonus-price">
            <span>{props.price}</span>
            <Icon name="b" />
          </div>
        )}
      </div>
      <Link className="ghost" to={"/case/" + props.id} />
    </div >
  )
}

interface BenefitCirlceProps {
  symbol: string
  color?: "orange" | "green"
  desc: string
}

function BenefitCirlce(props: BenefitCirlceProps) {
  return (
    <div className="case-preview-benefits__benefit">
      <div className={classWithModifiers("case-preview-benefits__circle", props.color)}>
        <span className="case-preview-benefits__symbol">{props.symbol}</span>
      </div>
      <Hint y="2.5em">
        <p>{props.desc}</p>
      </Hint>
    </div>
  )
}
