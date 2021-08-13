/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// STAFF
import { fetchPaymentBonuses } from "app/api/actions"
import { QueryProvider } from "app/components/other/MutuableQuery"
import useRestrictedArea from "resources/hooks/useRestrictedArea"
import FrequentQuestions from "views/support/FrequentQuestions"
import { Article } from "../../app/components/formatting/article"
import useTranslation from "../../resources/hooks/useTranslation"
import Payment from "./Payment"

export default () => {
  const payment = useTranslation(trans => trans.views.payment)
  return (
    <div>
      <Article title={payment.title}>
        {payment.desc}
      </Article>
      <QueryProvider action={fetchPaymentBonuses}>
        <Payment />
      </QueryProvider>
      <FrequentQuestions defaultQuestion="topUp" />
    </div>
  )
}
