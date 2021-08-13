/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { useContext } from "react"
import { useSelector } from "react-redux"
import { ticketSend } from "../../app/api/actions"
import { ClientAPI } from "../../app/api/client"
import ChatContainer from "../../app/components/Chat/ChatContainer"
import { TicketContext } from "./TicketFactory"

export default function TicketChat({ id }: { id: number; }) {
  const user = useSelector(state => state.user)
  const { state: messages, dispatch: dispatchMessages } = useContext(TicketContext)

  function postSendRequest(message: string) {
    ClientAPI
      .query(ticketSend(id, message))
      .then(({ error }) => {
        if (!error) {
          dispatchMessages(store => [
            ...store,
            {
              isOwner: true,
              message,
              authorImage: user.photo,
              datetime: new Date(),
            }
          ])
        }
      })
  }

  return (
    <ChatContainer onMessageSend={postSendRequest} messages={messages} maxHeight="50vh" />
  )
}
