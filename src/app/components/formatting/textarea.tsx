/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../../assets/scss/components/textarea.scss"

export interface TextareaProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  name?: string
  width?: string
  hegiht?: string
  maxLength?: number
  placeholder?: string
  defaultValue?: string
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function Textarea(props: TextareaProps) {
  return <textarea className="textarea" {...props} />
}
