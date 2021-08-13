/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import useTranslation from "resources/hooks/useTranslation"
import Table, { TableUser } from "app/components/formatting/table"
import { TopUserRequest } from "app/api/requests"

function TopBoard(props: { users: TopUserRequest[]; }) {
  const top = useTranslation(trans => trans.views.top)
  return (
    <div className="top__table">
      <Table thead={top.table?.menu || "Not translated"}>
        {props.users.map(user => (
          <tr key={"user_" + user.id}>
            <td>#{user.place}</td>
            <TableUser {...user} />
            <td>{user.cases}</td>
            <td>{user.contracts}</td>
            <td>{user.upgrades}</td>
            <td>{user.battles}</td>
            <td>{user.profit.toPrice()}</td>
          </tr>
        ))}
      </Table>
    </div>
  )
}

export default TopBoard
