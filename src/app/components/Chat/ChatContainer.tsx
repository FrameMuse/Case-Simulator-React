/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../../assets/scss/components/chat.scss"
// STAFF
import ChatSendForm from "./ChatSendForm"
import ChatMessage, { ChatMessageProps } from "./ChatMessage"

interface ChatBoxProps {
  children?: any
  messages?: ChatMessageProps[]
  maxHeight?: string
  onMessageSend?(message: string): void
}

function ChatContainer({ children, messages, maxHeight, onMessageSend }: ChatBoxProps) {
  return (
    <div className="chat">
      <div className="chat__field" style={{ maxHeight }}>
        {children ? children : messages?.map((message, index) => (
          <ChatMessage {...message} key={"message_" + index} />
        ))}
      </div>
      {onMessageSend && <ChatSendForm onSubmit={onMessageSend} />}
    </div>
  )
}

export default ChatContainer
