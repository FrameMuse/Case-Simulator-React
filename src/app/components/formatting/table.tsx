/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { User } from "../../../resources/interfaces/user"
// SCSS
import "../../../assets/scss/components/table.scss"
import { useSelector } from "react-redux"
import BrowserHistory from "resources/stores/BrowserHistory"

interface TableProps {
  thead: string | string[]
  children?: any
  theadExtra?: any
}

function Table({ thead: rawThead, theadExtra, children }: TableProps) {
  const thead = typeof rawThead === "string" ? rawThead.split(", ") : rawThead
  return (
    <div className="usual-table-wrapper">
      <table className="usual-table">
        <thead>
          <tr>
            {thead.map((th, key) => (
              <th key={"usual_table_thead_td_id_" + key}>{th}</th>
            ))}
          </tr>
          {theadExtra}
        </thead>
        <tbody>
          {children?.length ? children : (
            <tr>
              <td className="usual-table__empty">Ничего нету</td>
              <td className="usual-table__empty">Ничего нету</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export function TableUser(user: Pick<User, "id" | "photo" | "firstname" | "lastname">) {
  const currentUser = useSelector(state => state.user)
  return (
    <td>
      <div className="usual-table__user">
        <img src={user.photo} alt="avatar" className="usual-table__avatar" />
        <span>{user.firstname} {user.lastname}</span>
        <a className="ghost" onClick={() => BrowserHistory.push("/profile/" + (user.id === currentUser.id ? "" : user.id))} />
      </div>
    </td>
  )
}

export default Table
