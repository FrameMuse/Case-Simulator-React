/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import React from "react"
import { Route as DOMRoute, RouteComponentProps, Switch } from "react-router-dom"
import useRestrictedArea from "resources/hooks/useRestrictedArea"
import { RouteFlag, RouterComponentProps, RouterProps, Routes, View } from "../resources/interfaces/router"

function RouterComponent(combinedProps: RouterComponentProps & RouteComponentProps) {
  useRestrictedArea(combinedProps.flags.includes("DemoExclude"))
  return (
    <combinedProps.view {...combinedProps} />
  )
}

function Router(props: RouterProps) {
  ResolveRouterProps(props)
  const routesKeys = Object.getOwnPropertyNames(Route.routes)
  return (
    <Switch>
      {routesKeys.map((routeKey, index) => {
        const route = Route.routes[routeKey]
        return (
          <DOMRoute
            key={"route_" + index}
            path={route.path}
            exact={route.flags.includes("ExactPath")}
            render={props => <RouterComponent {...route} {...props} />}
          />
        )
      })}
    </Switch>
  )
}

function ResolveRouterProps(props: RouterProps): boolean {
  if (props.loginByPassword && process.env.NODE_ENV === "development") {
    const access = localStorage.getItem("Access")

    if (props.loginByPassword !== access) {
      const result = window.prompt("Сайт доступен только по паролю. Писать суда @FrameMuse", "Введите пароль:")

      if (result !== props.loginByPassword) {
        return ResolveRouterProps(props)
      }
    }

    localStorage.setItem("Access", props.loginByPassword)
  }

  Route.lazy = props.lazy

  if (process.env.NODE_ENV === "development") {
    console.log("Router promises resolved!")
  }

  return true
}

export function view<P = {}>(page: string): View<P> {
  try {
    if (Route.lazy) {
      return React.lazy(() => import("../views/" + page))
    } else {
      return require("../views/" + page).default
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      throw error
      throw new Error("RouterError: View " + page + " не найден")
    } return require("../views/" + page).default
  }
}

export class Route {
  public static lazy?: boolean
  public static routes: Routes = {}
  public static path(path: string, view: View, flags: RouteFlag[] = []) {
    if (!(flags instanceof Array) && process.env.NODE_ENV === "development") {
      throw new Error("RouteError: Флаги должны быть массивом")
    }

    Route.routes[path] = {
      path,
      view,
      flags
    }
  }
}

// Load routes
require("../routes/admin")
require("../routes/origin")

export default Router
