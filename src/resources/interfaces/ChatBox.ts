/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// export type ChatBoxAddMessageCallback = (message: ChatBoxMessage) => void
export type ChatBoxSubscriptionEvent = (subscribe: (args_0: (message: ChatBoxMessageProps) => void) => void) => void

export interface ChatBoxProps {
  id: number
  // children?(messages: ChatBoxMessage[], subscribe: ChatBoxSubscriptionEvent, unsubscribe: ChatBoxSubscriptionEvent): any
  defaultMessages?: ChatBoxMessageProps[]
  maxHeight?: string
}

export interface ChatBoxMessageProps {
  authorImage: string
  datetime: string
  isOwner: boolean
  message: string
}

export interface ChatBoxUser {
  id: number
  photo: string
}

export interface ChatBoxMessageProps {
  created_at: string
  msg: string
  ticket_id: number
  user: ChatBoxUser
  user_id: number
}
