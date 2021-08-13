/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../assets/scss/components/bonus-box.scss"
// STAFF
import Button from "../../app/components/UI/Button"
import { getBonusImage } from "../../resources/utils"
import { QuestionMark } from "./index"
import Hint from "../../app/components/UI/Hint"
import useTranslation from "resources/hooks/useTranslation"

interface DetailBonusBoxProps {
  id: number
  count?: number
  termsInHeader?: boolean
  onClick?(): void
}

function DetailBonusBox(props: DetailBonusBoxProps) {
  const bonuses = useTranslation(trans => trans.bonuses)
  const bonus = bonuses.list?.[props.id]
  return (
    <div className="detail-bonus">
      <div className="detail-bonus__container">
        <div className="detail-bonus__header">
          {props.onClick && (
            <Button className="detail-bonus__button" onClick={props.onClick}>{bonuses.get}</Button>
          )}
          {props.count && (
            <div className="detail-bonus-count">
              <span className="detail-bonus-count__number">x{props.count}</span>
            </div>
          )}
          {props.termsInHeader && <BonusTerms id={props.id} />}
        </div>
        <img src={getBonusImage(props.id)} alt="bonus" className="detail-bonus__image" />
        <div className="detail-bonus__bottom">
          <div className="detail-bonus__text">{bonus?.title}</div>
          {!props.termsInHeader && <BonusTerms id={props.id} />}
        </div>
      </div>
    </div>
  )
}

function BonusTerms({ id }: { id: number }) {
  const bonuses = useTranslation(trans => trans.bonuses)
  const bonus = bonuses.list?.[id]
  return (
    <div className="detail-bonus-terms">
      <div className="detail-bonus-terms__link">
        <QuestionMark />
      </div>
      <Hint y="2em">
        <div className="detail-bonus-terms__list">
          {bonus?.hints?.map((hint, index) => (
            <li className="detail-bonus-terms__term" key={"hint_" + index}>{hint}</li>
          ))}
        </div>
      </Hint>
    </div>
  )
}

export default DetailBonusBox
