/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { fetchWheelItems, getActionT } from "app/api/actions"
import { createContext, Dispatch, SetStateAction } from "react"
import { UseQueryResponse } from "react-fetching-library"
import { QueryPayload } from "resources/hooks/useCacheQuery"
import { WheelPageStatus } from "./WheelPage"

export const WheelContext = createContext<UseQueryResponse<QueryPayload<getActionT<typeof fetchWheelItems>>> & { state: { status: WheelPageStatus, setStatus: Dispatch<SetStateAction<WheelPageStatus>> } } | null>(null)
