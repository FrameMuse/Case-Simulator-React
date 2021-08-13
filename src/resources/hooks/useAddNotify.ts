/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { ErrorsStackErrorProps } from "app/components/other/ErrorsStack"
import { useCallback } from "react"
import { useDispatch } from "react-redux"

export default function useAddNotify() {
  const dispatch = useDispatch()
  const addNotify = useCallback((message: ErrorsStackErrorProps["message"], type?: ErrorsStackErrorProps["type"]) => {
    dispatch({
      type: "NOTIFY_STACK/ADD",
      payload: {
        type,
        message
      }
    })
  }, [dispatch])
  return addNotify
}
