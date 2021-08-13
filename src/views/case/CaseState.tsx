/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../assets/scss/components/case-state.scss"
// STAFF
import { Fragment, memo, useEffect, useState } from "react"
import { classAssign, classWithModifiers, scrollIntoView } from "../../resources/utils"
import Button from "../../app/components/UI/Button"
import { CaseStateConditionProps, CaseOpenState } from "../../resources/interfaces/case"
import useTranslation from "../../resources/hooks/useTranslation"
import { useSelector } from "react-redux"
import { useHistory } from "react-router"
import Popup from "app/controllers/Popup"
import LevelDescPopup from "app/components/popup/common/LevelDescPopup"

function CaseStateTemplateExp({ children, title, icon }: { children: any; title: any; icon: string }) {
  const user = useSelector(state => state.user)

  if (!user.authed) {
    return null
  }

  return (
    <div className="case-state">
      <span className={classAssign([classWithModifiers("case-state__icon", [icon]), "icon"])} />
      <div className="case-state__title">{title}</div>
      {children}
    </div>
  )
}

const CaseStateTemplate = memo(CaseStateTemplateExp)

export function CaseProgressBar({ forceProgress, to, values, toPrice }: { toPrice?: boolean; forceProgress?: number; to?: boolean; values: [number, number] }) {
  const progress = forceProgress ?? (values[0] / values[1])
  const formation = useTranslation(trans => trans.general.formation)
  return (
    <div className="case-progress-bar">
      <div className="case-progress-bar__line" style={{ "--progress": progress }} />
      <div className="case-progress-bar__counter">{(toPrice ? values[0].toPrice() : values[0])} {to ? formation.to : formation.among} {(toPrice ? values[1].toPrice() : values[1])}</div>
    </div>
  )
}

export function CaseStateFulfilled() {
  return (
    <CaseStateTemplate title="Условие выполено" icon="check">
      <p className="case-state__text">
        Вы выполнили все условия. Кейс
        доступен к открытию!
      </p>
    </CaseStateTemplate>
  )
}

export function CaseStateLimitation(props: Exclude<CaseOpenState["limit"], null>) {
  const caseLimit = useSelector(state => {
    const limit = state.caseLimit[props.case_id]
    if (limit && limit > props.value) {
      return limit
    }
    return props.value
  })
  return (
    <CaseStateTemplate title="Ограниченная серия!" icon="timer">
      <CaseProgressBar values={[caseLimit, props.limit]} />
      <p className="case-state__text">Кейсов осталось</p>
    </CaseStateTemplate>
  )
}
function Follow(props: { to?: string; children: any; scrollToId?: string; onClick?: () => void }) {
  const history = useHistory()
  async function click() {
    if (props.to) {
      await Promise.all([history.push(props.to || "/")])
    }

    props.onClick?.()
    scrollIntoView(props.scrollToId || "", true)
  }
  return (
    <Button className="case-state__button" onClick={click}>{props.children}</Button>
  )
}
export function CaseStateCondition({ id, type, value, threshold }: CaseStateConditionProps["data"]) {
  const user = useSelector(state => state.user)
  const caseStates = useTranslation(trans => trans.caseStates)

  function VKAuth() {
    return (
      <Fragment>
        <p className="case-state__text">{caseStates?.VKAuth}</p>
        <br />
        {/* <Button onClick={() => Popup.open(AuthPopup)}>{caseStates?.VKButton}</Button> */}
      </Fragment>
    )
  }

  function ConditionFragment() {
    switch (type) {
      case 1: {
        if (user.account_type !== 0) {
          return <VKAuth />
        }

        const caseCondition = caseStates.conditions?.[id]
        return (
          <Fragment>
            <p className="case-state__text">{caseCondition?.text}</p>
            <a href="//vk.com/standoffcase" target="_blank" className="case-state__button button" rel="noopener noreferrer">
              <span className="button__text">{caseCondition?.button}</span>
            </a>
          </Fragment>
        )
      }

      case 2: {
        if (user.account_type !== 0) {
          return <VKAuth />
        }

        const caseCondition = caseStates.conditions?.[id]
        return (
          <Fragment>
            <p className="case-state__text">{caseCondition?.text}</p>
            <a href="//vk.com/standoffcase" target="_blank" className="case-state__button button" rel="noopener noreferrer">
              <span className="button__text">{caseCondition?.button}</span>
            </a>
          </Fragment >
        )
      }

      case 3: {
        const caseCondition = caseStates.conditions?.[id]
        return (
          <Fragment>
            <p className="case-state__text">{caseCondition?.text}</p>
            <CaseProgressBar to toPrice values={[value, threshold]} />
            <Follow to="/payment">{caseCondition?.button}</Follow>
          </Fragment>
        )
      }

      case 4: {
        const caseCondition = caseStates.conditions?.[id]
        return (
          <Fragment>
            <p className="case-state__text">{caseCondition?.text}</p>
            <Follow to="/profile/referal" scrollToId="branch">{caseCondition?.button}</Follow>
            <CaseProgressBar values={[value, threshold]} />
          </Fragment>
        )
      }

      case 5: {
        const caseCondition = caseStates.conditions?.[id]
        return (
          <Fragment>
            <p className="case-state__text">{caseCondition?.text}</p>
            <Follow onClick={() => Popup.open(LevelDescPopup)}>{caseCondition?.button}</Follow>
            <CaseProgressBar to values={[value, threshold]} />
          </Fragment>
        )
      }

      case 6: {
        const caseCondition = caseStates.conditions?.[id]
        return (
          <Fragment>
            <p className="case-state__text">{caseCondition?.text}</p>
            <Follow to="/">{caseCondition?.button}</Follow>
            <CaseProgressBar values={[value, threshold]} />
          </Fragment>
        )
      }

      case 7: {
        const caseCondition = caseStates.conditions?.[id]
        return (
          <Fragment>
            <p className="case-state__text">{caseCondition?.text}</p>
            <Follow to="/contract">{caseCondition?.button}</Follow>
            <CaseProgressBar values={[value, threshold]} />
          </Fragment>
        )
      }

      case 8: {
        const caseCondition = caseStates.conditions?.[id]
        return (
          <Fragment>
            <p className="case-state__text">{caseCondition?.text}</p>
            <Follow to="/battles">{caseCondition?.button}</Follow>
            <CaseProgressBar values={[value, threshold]} />
          </Fragment>
        )
      }

      case 9: {
        const caseCondition = caseStates.conditions?.[id]
        return (
          <Fragment>
            <p className="case-state__text">{caseCondition?.text}</p>
            <Follow to="/upgrades">{caseCondition?.button}</Follow>
            <CaseProgressBar values={[value, threshold]} />
          </Fragment>
        )
      }

      case 10: {
        const caseCondition = caseStates.conditions?.[id]
        return (
          <Fragment>
            <p className="case-state__text">{caseCondition?.text}</p>
            <Follow to="/profile" scrollToId="branch">{caseCondition?.button}</Follow>
            <CaseProgressBar values={[value, threshold]} />
          </Fragment>
        )
      }

      case 11: {
        const caseCondition = caseStates.conditions?.[id]
        return (
          <Fragment>
            <p className="case-state__text">{caseCondition?.text}</p>
            <Follow onClick={() => Popup.open(LevelDescPopup)} scrollToId="branch">{caseCondition?.button}</Follow>
            <CaseProgressBar values={[value, threshold]} />
          </Fragment>
        )
      }
      case 12: {
        const caseCondition = caseStates.conditions?.[id]
        return (
          <Fragment>
            <p className="case-state__text">{caseCondition?.text}</p>
            <Follow to="/profile" scrollToId="branch">{caseCondition?.button}</Follow>
            <CaseProgressBar values={[value, threshold]} />
          </Fragment>
        )
      }

      case 13: {
        const caseCondition = caseStates.conditions?.[id]
        return (
          <Fragment>
            <p className="case-state__text">{caseCondition?.text}</p>
            <Follow to="/">{caseCondition?.button}</Follow>
            <CaseProgressBar values={[value, threshold]} />
          </Fragment>
        )
      }

      // case 14: {
      //   const caseCondition = caseStates.conditions?.[id]
      //   return (
      //     <Fragment>
      //       <p className="case-state__text">{caseCondition?.text}</p>
      //       <Follow to="/">{caseCondition?.button}</Follow>
      //       <CaseProgressBar values={[value, threshold]} />
      //     </Fragment>
      //   )
      // }

      default:
        return <>unknown condition type</>
    }
  }

  return (
    <CaseStateTemplate title="Условия открытия" icon="warning">
      <ConditionFragment />
      {/* type: {type} */}
    </CaseStateTemplate>
  )
}

export function TemperateCashback({ extraValue = 0 }: { extraValue?: number }) {
  const cashback = useSelector(state => state.user.cashback)
  const cashbackPercent = (cashback?.value || 0)
  const cashbackValue = extraValue * (1 + (cashbackPercent / 100))
  const [value, setValue] = useState(cashbackValue)

  useEffect(() => {
    setValue(cashbackValue)
  }, [extraValue, cashbackValue])

  useEffect(() => {
    if (!cashback) return

    const timeout = setTimeout(() => {
      setValue(0)
    }, (new Date(cashback.end).getTime() - Date.now()))

    return () => {
      clearTimeout(timeout)
    }
  }, [cashback?.end])

  return <>{value.toPrice()}</>
}

export default CaseStateTemplate
