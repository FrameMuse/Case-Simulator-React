/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { useState } from "react"
import useTranslation from "resources/hooks/useTranslation"
import Button from "../UI/Button"
import Input from "../UI/Input"

function ChatSendForm({ onSubmit }: { onSubmit: (message: string) => void }) {
  const [message, setMessage] = useState("")
  const ticketTrans = useTranslation(trans => trans.general.ticket)
  return (
    <div className="chat-send">
      <Input
        spellCheck="false"
        className="chat-send__message"
        placeholder={ticketTrans.message}
        width="100%"
        value={message}
        onChange={event => setMessage(event.target.value)}
      />
      <Button className="chat-send__submit" onClick={() => (onSubmit(message), setMessage(""))}>{ticketTrans.submit}</Button>
    </div>
  )
}

export default ChatSendForm
