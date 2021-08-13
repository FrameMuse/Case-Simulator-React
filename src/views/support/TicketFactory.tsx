/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { createContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { ChatMessageProps } from "../../app/components/Chat/ChatMessage"
import TicketTemplate from "./TicketTemplate"
import { TicketProps, TicketChatMessage } from "./Tickets"

export const TicketContext = createContext<{ state: ChatMessageProps[]; dispatch: React.Dispatch<React.SetStateAction<ChatMessageProps[]>> }>({ state: [], dispatch: () => { } })

export function TicketFactory(props: TicketProps) {
  const user = useSelector(state => state.user)
  const [state, dispatch] = useState(props.messages.map(toChatMessage))

  function toChatMessage(message: TicketChatMessage): ChatMessageProps {
    return {
      isOwner: user.id === message.user.id,
      message: message.msg,
      authorImage: message.user.photo,
      datetime: message.created_at,
    }
  }

  useEffect(() => {
    dispatch([...props.messages.map(toChatMessage)])
  }, [props])

  return (
    <TicketContext.Provider value={{ state, dispatch }}>
      <TicketTemplate {...props} />
    </TicketContext.Provider>
  )
}
