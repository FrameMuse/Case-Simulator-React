/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { classWithModifiers } from "../../../resources/utils"

export interface ChatMessageProps {
  isOwner: boolean
  message: string
  authorImage: string
  datetime: Date | string | number
}

export default function ChatMessage({ isOwner, message, authorImage, datetime }: ChatMessageProps) {
  const modifiers: string[] = []

  if (isOwner) {
    modifiers.push("owner")
  }

  return (
    <div className={classWithModifiers("chat-message", modifiers)}>
      <img src={authorImage} alt="participant's avatar" className="chat-message__author-avatar" />
      <div className="chat-message__message">
        <p className="chat-message__text">{message}</p>
        <span className="chat-message__datetime">{datetime.toLocaleDateTime()}</span>
      </div>
    </div>
  )
}
