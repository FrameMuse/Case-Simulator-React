/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

export interface CasePreviewProps {
  id: number
  title: string
  price: number
}

export interface CaseOpenState {
  cashback: number
  is_bonus: number // Boolean
  is_cashback: number // Boolean

  free: { count: number } | null
  limit: CaseStateLimitProps | null
  Conditions: CaseStateConditionProps[] | null
}

export interface CaseStateLimitProps {
  id: number
  case_id: number
  value: number
  limit: number
  cooldown: number
  enabled: number
  started_at: string
}
export interface CaseStateConditionProps {
  id: number
  case_id: number
  condition_id: number
  data: {
    id: number
    type: number
    time: number
    done: number // boolean
    value: number
    threshold: number
  }
}

export interface CasesListProps {
  id: number
  theme: string
  cases: {
    id: number
    price: number
  }[]
}
