/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCCS
import "../../assets/scss/views/profile/referal.scss"
// IMAGES
import CopyImage from "../../assets/images/icons/copy.png"
// STAFF
import { BranchContainer, BranchHeader, BranchSection } from "../../app/components/formatting/branch"
import Input from "../../app/components/UI/Input"
import Button from "../../app/components/UI/Button"
import { ClientAPI } from "../../app/api/client"
import { fetchReferalCodeActive, fetchReferalCodeUpdate, fetchReferalInfo } from "../../app/api/actions"
import useAddNotify from "../../resources/hooks/useAddNotify"
import Table, { TableUser } from "../../app/components/formatting/table"
import MutuableQuery from "../../app/components/other/MutuableQuery"
import { debounce } from "../../resources/utils/snippets"
import { useState } from "react"
import useTranslation from "resources/hooks/useTranslation"
import { inter } from "resources/utils"

function getRankImage(id: number) {
  return require("../../assets/images/ranks/" + id + ".png").default
}

export default function Referal() {
  const trans = useTranslation(trans => trans.views.profile.branch.referal)
  return (
    <MutuableQuery action={fetchReferalInfo}>
      {({ payload }) => {
        return (
          <BranchSection>
            <BranchHeader {...trans} />
            <ReferalMain {...payload} />
            <BranchContainer>
              <BranchHeader {...trans.levels} />
              <div className="referal-levels">
                {payload.lvls.map((lvl, index) => (
                  <div className="referal-levels__level" key={"level_" + index}>
                    <img src={getRankImage(index + 1)} alt="level image" className="referal-levels__image" />
                    <div className="referal-levels__point">{lvl.exp} {trans.referals}</div>
                    <p className="referal-levels__bonus">
                      {inter(trans.levels?.bonus, {
                        ...lvl,
                        money: lvl.money.toPrice()
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </BranchContainer>
            <BranchContainer>
              <BranchHeader {...trans.yourReferals} />
              {/* <div className="referal__referals"> */}
              <Table thead={trans.yourReferals?.menu || ""}>
                {payload.list.map((user, index) => (
                  <tr key={"user_" + index}>
                    <td>#{index + 1}</td>
                    <TableUser {...user}></TableUser>
                    <td>{user.allbalance.toPrice()}</td>
                    <td>{user.referal_balance.toPrice()}</td>
                  </tr>
                ))}
              </Table>
              {/* </div> */}
            </BranchContainer>
          </BranchSection>
        )
      }}
    </MutuableQuery>
  )
}

interface ReferalMainProps {
  count: number
  lvls: Array<{
    exp: number
    level: number
    money: number
    percent: number
  }>
  user: {
    balance: number
    code: string
    exp: number
    level: number
  }
}

function ReferalMain(props: ReferalMainProps) {
  const trans = useTranslation(trans => trans.views.profile.branch.referal)
  const general = useTranslation(trans => trans.general)
  const addNotify = useAddNotify()
  const [code, setCode] = useState(props.user.code)

  function Copy(clip: string) {
    if (window.navigator.permissions) {
      window.navigator.permissions.query({ name: "clipboard-write" as any }).then(result => {
        if (["granted", "prompt"].includes(result.state)) {
          navigator.clipboard.writeText(clip).then(() => {
            addNotify("coppied")
          }, function () {
            addNotify("cantCopy", "error")
          })
        } else {
          addNotify("copyNotAllowed", "error")
        }
      })

      return
    }

    document.execCommand("copy")
  }

  function UpdateCode(code: string) {
    if (code.length < 3) return
    ClientAPI
      .query(fetchReferalCodeUpdate(code))
      .then(() => {
        setCode(code)
        addNotify("inviteCodeSaved", "success")
      })
  }

  function ActivateCode(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const codeInput = event.currentTarget.elements.namedItem("invite-code") as HTMLInputElement
    if (String(codeInput.value).length < 3) {
      addNotify("littleCount", "error")
      return
    }

    ClientAPI
      .query(fetchReferalCodeActive(codeInput.value))
      .then(({ error }) => {
        if (error) return
        addNotify("codeActivated", "success")
      })
  }

  const currentReferalLevel = props.lvls[props.user.level]
  const nextReferaLevel = props.lvls[props.user.level]
  const inviteUrl = window.location.origin + "/invite/" + code
  return (
    <BranchContainer>
      <div className="referal-main">
        <div className="referal-flag">
          <div className="referal-flag__title">{trans.levelTitle}</div>
          <img src={getRankImage(props.user.level)} alt="rang flag image" className="referal-flag__image" />
          <div className="referal-flag__completion">
            <div className="referal-flag__title">{props.user.exp} {general.formation?.from} {nextReferaLevel.exp}</div>
            <div className="referal-flag__text">{trans.tillLevelUp} {props.user.level + 1}</div>
          </div>
        </div>
        <div className="referal-main__container">
          <div className="referal-stats">
            <div className="referal-stats__entry">
              <div className="referal-stats__value">{currentReferalLevel.percent}%</div>
              <div className="referal-stats__key">{trans.currentPercent}</div>
            </div>
            <div className="referal-stats__entry">
              <div className="referal-stats__value">{props.count}</div>
              <div className="referal-stats__key">{trans.currentReferals}</div>
            </div>
            <div className="referal-stats__entry">
              <div className="referal-stats__value">{props.user.balance.toPrice()}</div>
              <div className="referal-stats__key">{trans.currentProfit}</div>
            </div>
          </div>
          <div className="referal-invite">

            <div className="referal-invite__section">
              <div className="referal-invite__title">{trans.yourInviteCode}</div>
              <Input width="100%" defaultValue={code} onChange={debounce(event => UpdateCode(event.target.value), 250)} />
              <p className="referal-invite__desc">{trans.levelDesc}</p>
            </div>

            <div className="referal-invite__section">
              <div className="referal-invite__title">{trans.yourInviteLink}</div>
              <div className="referal-invite__invite" onClick={() => Copy(inviteUrl)}>
                <Input
                  readOnly
                  value={window.location.origin + "/invite/" + code}
                  width="100%"
                  className="referal-invite__input"
                  icon={<img className="referal-invite__copy icon" src={CopyImage} alt="copy icon" />}
                  onClick={event => event.currentTarget.select()}
                />
              </div>
            </div>

            <div className="referal-invite__section">
              <div className="referal-invite__title">{trans.haveCode}</div>
              <form className="referal-invite__row" onSubmit={ActivateCode}>
                <Input className="referal-invite__input" name="invite-code" width="100%" placeholder={trans.enterCode} />
                <Button className="referal-invite__button" type="submit">{trans.activate}</Button>
              </form>
              <p className="referal-invite__desc">
                {trans.inviteDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </BranchContainer>
  )
}
