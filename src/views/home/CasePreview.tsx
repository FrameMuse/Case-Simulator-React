/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import Icon from "app/components/UI/Icon"
import { TimerCountDown } from "app/components/UI/Timer"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import useTranslation from "resources/hooks/useTranslation"
import { BonusAccessPoint } from "routes/origin"
import Hint from "../../app/components/UI/Hint"
import { CasePreviewProps } from "../../resources/interfaces/case"
import { classWithModifiers, getCaseImage } from "../../resources/utils"

export default function CasePreview(props: CasePreviewProps & { hidden?: boolean }) {
  const caseLimit = useSelector(state => state.caseLimit[props.id] || props.limit?.value)
  const bonusId = useSelector(state => state.user.bonusCase?.case_id)
  const modes = useSelector(state => state.modes)
  const caseTrans = useTranslation(trans => trans.views.case)
  return (
    <div className={classWithModifiers("case-preview", [Boolean(props.payForBonus) && "bonus"])} hidden={props.hidden}>
      <div className="case-preview__image-section">
        <img src={getCaseImage(props.id)} alt={"Case " + props.title} className="case-preview__image" />
        {props.limit && !modes.demo && (
          <div className="case-preview-limit">
            <span className="case-preview-limit__icon icon" />
            <span className="case-preview-limit__text">{caseLimit} из {props.limit.limit}</span>
          </div>
        )}
        {(Boolean(props.is_bonus) || Boolean(props.is_cashback)) && !modes.demo && (
          <div className="case-preview-benefits">
            {Boolean(props.is_bonus) && (
              <BenefitCirlce symbol="B" color="orange" desc={"+ " + (props.price * 0.1).toFixed(2) + " Б " + caseTrans.benefitText1} />
            )}
            {Boolean(props.is_cashback) && (
              <BenefitCirlce symbol="%" color="green" desc={"+" + props.cashback.toPrice() + " " + caseTrans.benefitText2} />
            )}
          </div>
        )}
      </div>
      <div className="case-preview__title">{props.title || "unnamed > " + props.id}</div>
      {Boolean(props.time && !props.free) && (
        <div className="case-preview__timer">
          <TimerCountDown distance={props.time} />
        </div>
      )}
      <div className="case-preview__bottom">
        {!props.payForBonus && Boolean(props.price) && (
          <div className={classWithModifiers("case-preview__price", [modes.demo && "orange"])}>
            <span className="case-preview__text">{props.price.toPrice()}</span>
          </div>
        )}
        {!props.payForBonus && Boolean(props.oldPrice) && (
          <div className="case-preview__old-price">
            <span className="case-preview__text case-preview__text--dark">{props.oldPrice.toPrice()}</span>
          </div>
        )}
        {Boolean(props.payForBonus) && (
          <div className="case-preview__bonus-price">
            <span>{props.price}</span>
            <Icon name="b" />
          </div>
        )}
      </div>
      <Link className="ghost" to={props.id === bonusId ? ("/bonus!" + BonusAccessPoint) : ("/case/" + props.id)} />
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
      <div className={classWithModifiers("case-preview-benefits__circle", [props.color])}>
        <span className="case-preview-benefits__symbol">{props.symbol}</span>
      </div>
      <Hint y="2.5em">
        <p>{props.desc}</p>
      </Hint>
    </div>
  )
}
