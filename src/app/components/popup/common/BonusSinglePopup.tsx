/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "assets/scss/popups/bonus-single.scss"
// IMAGES
import { ReactComponent as SVGCrossMark } from "assets/svg/crossmark.svg"
import { ReactComponent as SVGCheckMark } from "assets/svg/checkmark.svg"
// STAFF
import { PopupDefaultLayout } from "../PopupProvider"
import { classWithModifiers, inter } from "resources/utils"
import Button from "app/components/UI/Button"
import useTranslation from "resources/hooks/useTranslation"
import AuthPopup from "./AuthPopup"
import { useSelector } from "react-redux"
import MutuableQuery, { useContextQuery } from "app/components/other/MutuableQuery"
import { fetchOnetimeBonus, fetchOnetimeBonusActivation } from "app/api/actions"
// import { NotificationSubscribe } from "serviceWorker-firebase"
import { ClientAPI } from "app/api/client"
import useAddNotify from "resources/hooks/useAddNotify"
import OuterLink from "app/components/other/OuterLink"

export default function BonusSinglePopup() {
  const { article } = useTranslation(trans => trans.popup.bonusSingle)
  const user = useSelector(state => state.user)
  if (!user.authed) return <AuthPopup />
  return (
    <PopupDefaultLayout {...article} rowGap="3.5em" width="65em">
      <div className="bonus-single">
        <MutuableQuery action={fetchOnetimeBonus}>
          {({ payload }) => {
            return (
              <div className="bonus-single__container">
                {payload.list.map(bonus => (
                  <BonusTask {...bonus} key={"bonus_" + bonus.id} />
                ))}
              </div>
            )
          }}
        </MutuableQuery>
      </div>
    </PopupDefaultLayout>
  )
}

export interface BonusTaskProps {
  id: number
  type: number
  name: "vkSub" | "vkSms" | "instagram" | "push" | "telegram" | "youtube" | "market" | "contract" | "battle" | "upgrade" | "case"
  value: number
  done: boolean
  link?: string
}

// function BonusTask(props: BonusTaskProps) {
//   const user = useSelector(state => state.user)
//   const { tasks } = useTranslation(trans => trans.popup.bonusSingle)
//   const task = tasks?.[props.name]
//   let hasError: boolean | null = null
//   let localLink = ""
//   function submit() {
//     switch (props.name) {
//       case "push":
//         NotificationSubscribe()
//         break;

//       default:
//         break;
//     }
//   }
//   switch (props.name) {
//     case "vkSms":
//     case "vkSub":
//       if (user.account_type > 0) hasError = true
//       break
//     case "battle":
//       localLink = "/battles"
//       break
//     case "case":
//       localLink = "/"
//       break
//     case "upgrade":
//     case "contract":
//       localLink = "/" + props.name
//       break

//     default:
//       break;
//   }
//   if (!tasks || !task) return null
//   return (
//     <div className="bonus-task">
//       <div className="bonus-task__top">
//         <div className={classWithModifiers("bonus-task__circle", [props.done && "done", hasError && "error"])}>
//           {props.done ? <SVGCheckMark /> : <SVGCrossMark />}
//         </div>
//         <h3 className="bonus-task__title">{inter(task.title)}</h3>
//       </div>
//       {hasError && (
//         <div className="bonus-task__bottom">
//           <p className="bonus-task__text">{task.fallback}</p>
//         </div>
//       )}

//       {!hasError && (<div className="bonus-task__bottom">
//         {props?.link ? (
//           <a
//             href={props?.link}
//             target="_blank"
//             rel="noopener noreferrer"
//             className={classAssign(["button", classWithModifiers("bonus-task__button", [props.done && "done"])])}
//           >
//             <span className="button__text">
//               {!props.done && task.buttonName}
//               {props.done && tasks.completeText}
//             </span>
//           </a>
//         ) : localLink ? (
//           <Link to={localLink} onClick={() => Popup.resolveAll()} className={classAssign(["button", classWithModifiers("bonus-task__button", [props.done && "done"])])}>
//             <span className="button__text">
//               {!props.done && task.buttonName}
//               {props.done && tasks.completeText}
//             </span>
//           </Link>
//         ) : (
//           <Button
//             className={classWithModifiers("bonus-task__button", [props.done && "done"])}
//             disabled={props.done}
//             onClick={submit}
//           >
//             {!props.done && task.buttonName}
//             {props.done && tasks.completeText}
//           </Button>
//         )}
//         {!hasError && !props.done && (
//           <label className="bonus-task__reward">{props.value.toPrice()}</label>
//         )}
//       </div>)}
//     </div>
//   )
// }

function BonusTask(props: BonusTaskProps) {
  const { modifyPayload } = useContextQuery<typeof fetchOnetimeBonus>()
  const user = useSelector(state => state.user)
  const addNotify = useAddNotify()
  const { tasks } = useTranslation(trans => trans.popup.bonusSingle)
  const task = tasks?.[props.name]
  const modifiers: string[] = []

  if (props.done) {
    modifiers.push("done")
  }

  function getBonus() {
    ClientAPI
      .query(fetchOnetimeBonusActivation(props.id))
      .then(({ error, payload }) => {
        if (error || !payload) return

        addNotify("singleBonusActivated", "success")
        modifyPayload(state => {
          if (!state) return state

          const list = [...state.list]
          const task = list.find(task => task.id === props.id)
          if (!task) return state
          const taskIndex = list.indexOf(task)
          list.splice(taskIndex, 1, {
            ...props,
            done: true
          })
          return { ...state, list }
        })
      })
  }

  function submit() {
    switch (props.name) {
      case "push":
        if ("Notification" in window) {
          Notification
            .requestPermission()
            .then(() => {
              // NotificationSubscribe()
              getBonus()
            })
        }
        break

      default:
        getBonus()
        break
    }
  }

  function renderBottom() {
    if (props.done) {
      return (
        <div className="bonus-task__bottom">
          <Button disabled className={classWithModifiers("bonus-task__button", modifiers)}>
            {tasks?.completeText}
          </Button>
        </div>
      )
    }

    switch (props.name) {
      case "vkSms":
      case "vkSub":
        if (user.account_type > 0) {
          return (
            <div className="bonus-task__bottom">
              <p className="bonus-task__text">{task?.fallback}</p>
            </div>
          )
        }
        break

      case "telegram":
        return (
          <div className="bonus-task__bottom">
            <OuterLink onClick={submit} href={process.env.REACT_APP_SITE_SOCIAL_TELEGRAM} className="button bonus-task__button">
              <span className="button__text">{task?.buttonName}</span>
            </OuterLink>
            <label className="bonus-task__reward">{props.value.toPrice()}</label>

          </div>
        )

      case "youtube":
        return (
          <div className="bonus-task__bottom">
            <OuterLink onClick={submit} href={process.env.REACT_APP_SITE_SOCIAL_YOTUBE} className="button bonus-task__button">
              <span className="button__text">{task?.buttonName}</span>
            </OuterLink>
            <label className="bonus-task__reward">{props.value.toPrice()}</label>

          </div>
        )

      case "instagram":
        return (
          <div className="bonus-task__bottom">
            <OuterLink onClick={submit} href={process.env.REACT_APP_SITE_SOCIAL_INSTAGRAM} className="button bonus-task__button">
              <span className="button__text">{task?.buttonName}</span>
            </OuterLink>
            <label className="bonus-task__reward">{props.value.toPrice()}</label>

          </div>
        )

      default:
        break
    }

    return (
      <div className="bonus-task__bottom">
        <Button onClick={submit} className={classWithModifiers("bonus-task__button", modifiers)}>
          {task?.buttonName}
        </Button>
        <label className="bonus-task__reward">{props.value.toPrice()}</label>
      </div>
    )
  }
  return (
    <div className="bonus-task">
      <div className="bonus-task__top">
        <div className={classWithModifiers("bonus-task__circle", modifiers)}>
          {props.done ? <SVGCheckMark /> : <SVGCrossMark />}
        </div>
        <h3 className="bonus-task__title">{inter(task?.title)}</h3>
      </div>
      {modifiers.includes("error") ? (
        <div className="bonus-task__bottom">
          <p className="bonus-task__text">{task?.fallback}</p>
        </div>
      ) : renderBottom()}

      {/* <Link to={localLink} onClick={() => Popup.resolveAll()} className={classAssign(["button", classWithModifiers("bonus-task__button", [props.done && "done"])])}>
        <span className="button__text">
          {!props.done && task.buttonName}
          {props.done && tasks.completeText}
        </span>
      </Link>

      <Button
        className={classWithModifiers("bonus-task__button", [props.done && "done"])}
        disabled={props.done}
        onClick={submit}
      >
        {!props.done && task.buttonName}
        {props.done && tasks.completeText}
      </Button> */}

      {/* {!hasError && !props.done && ( */}
      {/* <label className="bonus-task__reward">{props.value.toPrice()}</label> */}
      {/* )} */}
    </div>)
}
