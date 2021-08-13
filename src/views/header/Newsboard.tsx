/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../assets/scss/components/newsboard.scss"

import { Link, useHistory } from "react-router-dom"
import Button from "../../app/components/UI/Button"
import MutuableQuery from "app/components/other/MutuableQuery"
import useTranslation from "resources/hooks/useTranslation"
import { fetchNewsList } from "app/api/actions"
import { getlast } from "resources/utils"
import SoundController from "app/controllers/SoundController"
import { useEffect } from "react"

export default function Newsboard() {
  const translation = useTranslation()
  useEffect(() => {
    SoundController.play("notice")
    return () => {
      SoundController.pause("notice")
    }
  }, [])
  return (
    <div className="news-board">
      <div className="news-board__inner">
        <MutuableQuery action={fetchNewsList(translation?.langCode || "")}>
          {({ payload }) => (
            payload.map((element, index) => (
              <NewsboardElement key={"mewsboardElement_" + index} {...element} />
            ))
          )}
        </MutuableQuery>
      </div>
    </div>
  )
}



export interface NewsboardElementProps {
  id: number
  title: string
  content: string
  button?: string
  created_at: string
}

// function ParseContent(content: string) {
//   let result: {
//     0: string
//     groups: {
//       title: string
//       link: string
//     }
//   }
//   let newContent: any[] = []
//   const regex = /\[(?<title>\w+)\]\((?<link>\/\w+)\)/

//   while (result = regex.exec(content) as any) {
//     if (result) {
//       const separator = result[0]
//       const split = content.split(separator)
//       const { title, link } = result.groups

//       newContent = [
//         ...newContent,
//         split[0],
//         <Link to={link}>{title}</Link>
//       ]
//       // Third part of a split
//       content = split[2]
//     }
//   }

//   return [...newContent, content]
// }

function ParseContent(haystack: string) {
  const regex = /\[(?<title>(.*?))\]\((?<link>\/(.*?))\)/

  let text = String(haystack)
  let result: any[] = []
  let match: {
    0: string
    index: number
    groups: {
      title: string
      link: string
    }
  }

  while ((match = regex.exec(text) as unknown as typeof match) !== null) {
    const { title, link } = match.groups
    const [firstPiece, secondPiece] = text.split(match[0])

    // console.log(link, secondPiece);

    result = [
      ...result,
      firstPiece,
      <Link to={link} key={"match_link_" + match.index}>{title}</Link>
    ]

    text = secondPiece
  }

  return result
}

function NewsboardElement({
  title,
  content,
  button,
  created_at
}: NewsboardElementProps) {
  const history = useHistory()
  const parsedButton: {
    title: string
    link: string
  } | undefined = button && JSON.parse(button.toString())
  // console.log(12, ParseContent(content));

  return (
    <div className="news-board__element">
      <div className="news-board__date">{created_at.toLocaleDateTime(true)}</div>
      <div className="news-board__title">{title}</div>
      <p className="news-board__desc">{ParseContent(content)}</p>
      {parsedButton && (
        <Button className="news-board__button" modify="magic" color="yellow" onClick={() => history.push(parsedButton.link)}>{parsedButton.title}</Button>
      )}
    </div>
  )
}
