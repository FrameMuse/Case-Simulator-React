/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { Component, useState } from "react"
import { classWithModifiers } from "../../../resources/utils"
// SCSS
import "../../../assets/scss/components/faq.scss"

interface FAQClauseProps {
  summary: string
  children: any
}

export class FAQ extends Component {
  render() {
    return (
      <div className="faq">{this.props.children}</div>
    )
  }
}

export function FAQClause({ summary, children }: FAQClauseProps) {
  const [deployed, setDeployed] = useState<boolean>(false)
  const [height, setHeight] = useState<number | undefined>()
  
  const modifiers: string[] = []

  if (deployed) {
    modifiers.push("deployed")
  }

  return (
    <div className={classWithModifiers("faq__clause", modifiers)}>
      <div className="faq__summary" onClick={() => setDeployed(!deployed)}>
        <div className="faq__title">{summary}</div>
      </div>
      <div className="faq__content" style={{ "--height": height + "px" } as any} ref={element => setHeight(element?.scrollHeight)}>
        <div className="faq__inner">
          <div className="faq__text">{children}</div>
        </div>
      </div>
    </div>
  )
}
