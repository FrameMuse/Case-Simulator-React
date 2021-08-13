/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../assets/scss/components/setup-avatar.scss"
// SVG
import UnkwonUserImage from "../../assets/svg/unknown.svg"
// STAFF
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Button from "../../app/components/UI/Button"
import { XHRSendForm } from "../../resources/utils/XHRSendForm"
import { BranchContainer, BranchHeader, BranchSection } from "../../app/components/formatting/branch"
import useTranslation from "resources/hooks/useTranslation"

export default function Settings() {
  const trans = useTranslation(trans => trans.views.profile.branch.settings)
  return (
    <BranchSection>
      <BranchHeader {...trans} />
      <BranchContainer>
        <SetupAvatar />
      </BranchContainer>
    </BranchSection>
  )
  return (
    <div className="profile-settings">
      <div className="profile-settings__section">
        <SetupAvatar />
      </div>
    </div>
  )
}

function SetupAvatar() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const trans = useTranslation(trans => trans.views.profile.branch.settings)
  const inputRef = useRef<HTMLInputElement | null>(null)
  function uploadImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file: File = event.target.files?.[0] as File

    if (file) {
      const standoff_photo = URL.createObjectURL(file)

      XHRSendForm<{ penis: number }>(new XMLHttpRequest(), "/user/avatar/upload", { file }).then(() => {
        (new Image()).src = standoff_photo

        dispatch({
          type: "USER_INFO_UPDATE",
          payload: {
            standoff_photo
          }
        })
      })
    }
  }
  return (
    <div className="setup-avatar">
      <div className="setup-avatar__title">{trans.avatarTitle}</div>
      <p className="setup-avatar__desc">{trans.avatarDesc}</p>
      <div className="setup-avatar__bottom">
        <img src={user.getStandoffPhoto()} onError={el => el.currentTarget.src = UnkwonUserImage} alt="standoff avatar" className="setup-avatar__image" />
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={uploadImage} />
        <Button className="setup-avatar__button" onClick={() => inputRef.current?.click()}>{trans.uploadImage}</Button>
      </div>
    </div>
  )
}
