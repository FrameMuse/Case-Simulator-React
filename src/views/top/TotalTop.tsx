/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import TopPlace from "./TopPlace"
import { TopUserRequest } from "app/api/requests"

export function TotalTop(props: { users: TopUserRequest[] }) {
  return (
    <div className="top__places">
      <TopPlace user={props.users[0]} place="1" />
      <TopPlace user={props.users[1]} place="2" />
      <TopPlace user={props.users[2]} place="3" />
    </div>
  )
}
