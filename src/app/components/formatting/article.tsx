/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { classWithModifiers } from "../../../resources/utils"

import "../../../assets/scss/components/article.scss"

export interface ArticleProps {
  title: any
  type?: "left" | "center" | "dependent"
  heading?: "h2" | "h3"
  className?: string
  children?: any
  modifiers?: any[]
}

export function Article(props: ArticleProps) {
  const Heading = props.heading as keyof JSX.IntrinsicElements
  return (
    <div className={classWithModifiers(props.className || "", [...props.modifiers || [], props.type || "left"])}>
      <Heading className={props.className + "__title"}>{props.title}</Heading>
      {props.children && <p className={props.className + "__text"}>{props.children}</p>}
    </div>
  )
}

Article.defaultProps = {
  heading: "h2",
  className: "page-article"
} as ArticleProps
