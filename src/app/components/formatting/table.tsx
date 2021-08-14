/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../../assets/scss/components/table.scss"

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

export default Table
