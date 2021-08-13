/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import ClientSocket, { SocketActions } from "app/socket/ClientSocket"
import { useEffect, useState } from "react"
import useTranslation from "resources/hooks/useTranslation"
import { getTicketsList } from "../../app/api/actions"
import { Article } from "../../app/components/formatting/article"
import { useContextQuery } from "../../app/components/other/MutuableQuery"
import { TicketFactory } from "./TicketFactory"

export interface TicketChatMessage {
  created_at: Date | string
  msg: string
  ticket_id: number
  user: {
    id: number
    photo: string
  }
  user_id: number
}
export interface TicketProps {
  id: number
  status: number
  title: string
  messages: TicketChatMessage[]
  created_at: string
}

export default function Tickets() {
  const { payload, modifyPayload } = useContextQuery<typeof getTicketsList>()
  const trans = useTranslation(trans => trans.views.support.tickets)
  const [excepts, setExcepts] = useState<number[]>([])

  useEffect(() => {
    function TicketCloseEvent({ id }: { id: number }) {
      setExcepts(state => [...state, id])
    }

    function NewMessageEvent({ msg }: SocketActions["TICKET_MSG"]) {
      const data = [...payload.data]
      const ticket = data.find(ticket => ticket.id === msg.ticket_id)
      if (!ticket) return
      const ticketIndex = data.indexOf(ticket)
      ticket.messages.push(msg)

      data.splice(ticketIndex, 1, { ...ticket })

      // console.log(data);

      modifyPayload({
        ...payload,
        data
      })
    }

    ClientSocket.add("TICKET_MSG", NewMessageEvent)
    ClientSocket.add("TICKET_CLOSE", TicketCloseEvent)
    return () => {
      ClientSocket.delete("TICKET_MSG", NewMessageEvent)
      ClientSocket.delete("TICKET_CLOSE", TicketCloseEvent)
    }
  }, [payload])

  // console.log(payload.data);


  return (
    <div className="support-tickets">
      <Article className="support-article" title={trans.title} />
      <div className="support-tickets__container">
        {payload.data.length <= 0 && (
          <div className="support-tickets__empty">Ничего нету</div>
        )}
        {payload.data.filter(ticket => !excepts.includes(ticket.id)).map(ticket => (
          <TicketFactory key={"ticket_" + ticket.id} {...ticket} />
        ))}
      </div>
    </div>
  )
}
