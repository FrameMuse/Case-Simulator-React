/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../../assets/scss/components/bonus-box.scss"
// STAFF
import Button from "../UI/Button"
import { getBonusImage } from "../../../resources/utils"

interface BonusBoxProps {
  id: number
  onClick?(): void
}

export function BonusBox(props: BonusBoxProps) {
  return (
    <div className="bonus-box">
      <div className="bonus-box__container">
        <img src={getBonusImage(props.id || 0)} alt="bonus" className="bonus-box__image" />
        <p className="bonus-box__bonus">
          Рандомный кейс
          при пополнении
          от 200 ₽
        </p>
      </div>
      {props.onClick && <Button className="bonus-box__button" onClick={props.onClick}>Использовать</Button>}
    </div>
  )
}
