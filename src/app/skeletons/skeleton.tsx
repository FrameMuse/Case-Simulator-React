/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import { CSSProperties } from "react"
import { classAssign } from "resources/utils"
import "../../assets/scss/components/skeleton.scss"

export default function Skeleton({ width, height, style, className, children }: { width?: string; style?: CSSProperties; className?: string; height?: string; children?: any }) {
  if (children) return children
  return (
    <div className={classAssign(["skeleton", className])} style={{ width, height, ...style }} />
  )
}
