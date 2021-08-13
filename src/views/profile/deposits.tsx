/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { fetchPaymentHistory } from "app/api/actions"
import MutuableQuery from "app/components/other/MutuableQuery"
import useTranslation from "resources/hooks/useTranslation"
import { BranchContainer, BranchHeader, BranchSection } from "../../app/components/formatting/branch"
import Table from "../../app/components/formatting/table"
import Price from "../../app/helpers/Price"

export default function Deposits() {
  const trans = useTranslation(trans => trans.views.profile.branch.deposits)
  const price = new Price(7800)
  return (
    <BranchSection>
      <BranchHeader {...trans} />
      <BranchContainer>
        <MutuableQuery action={fetchPaymentHistory}>
          {({ payload }) => (
            <Table thead={trans.menu || ""}>
              {payload.data.map(deposit => (
                <tr key={deposit.id}>
                  <td>#{deposit.id}</td>
                  <td>{deposit.amount.toPrice()}</td>
                  <td>{deposit.updated_at.toLocaleDateTime(true)}</td>
                  <td className="green-color">{"+ " + deposit.recieved_amount}</td>
                </tr>
              ))}
            </Table>
          )}
        </MutuableQuery>
      </BranchContainer>
    </BranchSection>
  )
}
