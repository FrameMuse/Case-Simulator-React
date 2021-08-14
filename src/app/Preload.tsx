/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import ClientSocket from "./socket/ClientSocket"

import { getUserInfo } from "./api/actions"
// import { ClientAPI } from "./api/client"
import store from "./redux/store"
import { User } from "../resources/interfaces/user"
import { useQuery } from "react-fetching-library"
import Loader from "./components/other/Loader"

export default function Preload({ children }: { children: any }) {
  const dispatch = store.dispatch

  function Setup(payload: User) {
    // Socket
    ClientSocket.setupQuery({ userId: payload.id })
    ClientSocket.serveSocket()
  }
  const { loading, payload } = useQuery(getUserInfo)
  if (!ClientSocket.serving && payload) {
    Setup(payload)
  }

  if (loading) return <Loader />

  return children

  // return (
  //   <QueryWithCover__UnSafe action={getUserInfo}>
  //     {function ({ payload }) {
  //     }}
  //   </QueryWithCover__UnSafe>
  // )
}
