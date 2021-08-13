/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { Article } from "../../app/components/formatting/article"
import Input from "../../app/components/UI/Input"
import Textarea from "../../app/components/formatting/textarea"
import ButtonTool from "../../app/components/UI/ButtonTool"
import { createTicket, getTicketsList } from "../../app/api/actions"
import { ClientAPI } from "../../app/api/client"
import { FormCollection } from "../../resources/interfaces/Object"
import { TicketChatMessage, TicketProps } from "./Tickets"
import WebStore from "../../resources/stores/store"
import useTranslation from "resources/hooks/useTranslation"
import { useContextQuery } from "app/components/other/MutuableQuery"

export default function SupportForm() {
  const support = useTranslation(trans => trans.views.support)
  const { payload: tickets, modifyPayload } = useContextQuery<typeof getTicketsList>()
  function createTicketEvent(finish: Function, form: FormCollection<{ title: HTMLInputElement; msg: HTMLTextAreaElement }>) {
    ClientAPI
      .query(createTicket(form.elements.title.value, form.elements.msg.value))
      .then(({ error, payload }) => {
        if (error || !payload) return

        const { user } = WebStore.store.getState()
        const message: TicketChatMessage = {
          ...payload,
          user,
          msg: form.elements.msg.value,
          ticket_id: payload.id,
        }
        const ticket: TicketProps = {
          ...payload,
          status: 0,
          messages: [message]
        }

        modifyPayload({
          ...tickets,
          data: [ticket, ...tickets.data]
        })
      })
      .then(() => {
        finish()
        form.reset()
      })
  }
  return (
    <div className="support-form">
      <Article className="support-article" title={support.help?.title}>
        {support.help?.desc}
      </Article>
      <form className="support-form__container" onSubmit={event => event.preventDefault()}>
        <Input autoComplete="off" maxLength={70} spellCheck="false" autoCorrect="off" name="title" width="100%" placeholder={support.help?.subject} />
        <Textarea name="msg" maxLength={300} spellCheck="false" autoCorrect="off" placeholder={support.help?.message} />
        <ButtonTool submit onClick={createTicketEvent} className="support-form__submit" color="green">{support.help?.submit}</ButtonTool>
      </form>
    </div>
  )
}
