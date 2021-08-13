/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { useState } from "react"
import { classWithModifiers } from "../../resources/utils"
import TicketChat from "./TicketChat"
import { TicketProps } from "./Tickets"

const TicketStatus = ["open", "closed", "deleted"]

export default function TicketTemplate({ id, status, title, created_at }: TicketProps) {
  const [deployed, setDeployed] = useState<boolean>(false)
  const [height, setHeight] = useState<number | undefined>()

  const modifiers: string[] = []

  if (deployed) {
    modifiers.push("deployed")
  }

  return (
    <div className="support-tickets__ticket">
      <div className={classWithModifiers("support-tickets__header", modifiers)} onClick={() => setDeployed(!deployed)}>
        <div className={classWithModifiers("support-tickets__status", [TicketStatus[status]])} />
        <div className="support-tickets__subject">{title}</div>
        <div className="support-tickets__datetime">{created_at.toLocaleDateTime()}</div>
      </div>
      <div className={classWithModifiers("support-tickets__content", modifiers)} style={{ "--height": height + "px" } as any} ref={element => setHeight(element?.scrollHeight)}>
        <div className="support-tickets__inner">
          <TicketChat id={id} />
        </div>
      </div>
    </div>
  )
}
