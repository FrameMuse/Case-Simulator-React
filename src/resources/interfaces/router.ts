/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { RouteComponentProps } from "react-router-dom"

interface StaticContext {
  statusCode?: number;
}

export type View<P = {}> = ((props: ViewProps<P>) => JSX.Element) | React.LazyExoticComponent<React.ComponentType<any>>
export type ViewProps<Params = {}, State = unknown> = RouteComponentProps<Params, StaticContext, State>

export type RouteFlag = "DemoExclude" | "ExactPath"
export type Routes = Record<string, RouterComponentProps>

export interface RouterProps {
  lazy?: boolean
  loginByPassword?: string
}

export interface RouterComponentProps {
  path: string | string[],
  view: View,
  flags: RouteFlag[]
  // ...
}
