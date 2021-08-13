import { Action, ClientAPI } from "app/api/client"
import { useEffect, useState } from "react"
import { PaginationType } from "resources/interfaces/Object"
import Button from "../../components/UI/Button"
import Empty from "../../components/other/Empty"
import { useContextQuery } from "../../components/other/MutuableQuery"
import { QueryResponse } from "react-fetching-library"
import WebStore from "resources/stores/store"
import { addNotify } from "resources/reducers/errors-stack"
import { ErrorsStackErrorProps } from "app/components/other/ErrorsStack"
import { getPaginationData, removeHostPath } from "./QueryHelpers"

interface QueryPaginationProps {
  children: any
  use?: string
  empty?: string
  emptyLink?: string
}

export const DisplayError = (message: ErrorsStackErrorProps["message"]) => WebStore.store.dispatch(addNotify(message, "error"))

export function QueryPagination(props: QueryPaginationProps) {
  const { payload: currentPayload, modifyPayload } = useContextQuery<Action<Record<string, any>>>()
  const [loading, setLoading] = useState(false)
  const paginationData = getPaginationData(currentPayload, props.use || "")

  if (!paginationData) throw new Error("QueryPaginationError: 'paginationData' is empty")

  const isEmpty = !paginationData.data?.length
  const isAtLastPage = () => {
    const { current_page, last_page } = paginationData
    if (current_page === last_page) return true
    return false
  }

  async function loadMore() {
    if (!paginationData?.next_page_url || isAtLastPage()) return

    setLoading(true)

    const response = await ClientAPI.query<any>({
      method: "GET",
      endpoint: removeHostPath(paginationData.next_page_url) || "eperror",
    })

    if (response.error) DisplayError("Error while loading more")

    modifyPayload(appendCurrentPayload(response.payload))
    setLoading(false)
  }

  function appendCurrentPayload(payload: QueryResponse["payload"]): Parameters<typeof modifyPayload>[0] {
    if (!payload) return currentPayload
    if (props.use) {
      return {
        ...currentPayload,
        [props.use]: {
          ...payload[props.use],
          data: [
            ...currentPayload[props.use]["data"],
            ...payload[props.use]["data"]
          ]
        }
      }
    }

    return {
      ...payload,
      data: [
        ...currentPayload.data,
        ...payload.data
      ]
    }
  }

  if (!isEmpty && isAtLastPage()) {
    return props.children
  }

  return (
    <PaginationWrapper>
      {props.children}
      <br />
      <br />
      <br />
      <br />
      {isEmpty ? (
        <Empty link={props.emptyLink} children={props.empty} />
      ) : (
        <Button
          color={loading ? "blue" : "yellow"}
          disabled={loading}
          onClick={loadMore}
          className="paggination__button"
        >
          {loading ? "Загружаем..." : "Загрузить ещё"}
        </Button>
      )}
    </PaginationWrapper>
  )
}

function PaginationWrapper(props: { children: any }) {
  return <div className="paggination" style={{ display: "grid" }}>{props.children}</div>
}
