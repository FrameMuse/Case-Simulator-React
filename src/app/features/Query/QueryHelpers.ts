import { PaginationType } from "resources/interfaces/Object"

export function removeHostPath(url?: string | null) {
  return url?.replace(process.env.REACT_APP_SITE_API_URL || "", "") || null
}

export function getPaginationData(payload: any, subPath: string): PaginationType | null {
  return subPath ? payload[subPath] : payload
}

export function getPaginationURLs(payload: any, subPath: string) {
  const paginationData = getPaginationData(payload, subPath)

  const nextPageUrl = removeHostPath(paginationData?.next_page_url)
  const lastPageUrl = removeHostPath(paginationData?.last_page_url)

  return {
    nextPageUrl,
    lastPageUrl
  }
}