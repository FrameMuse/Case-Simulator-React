/**
 * Теперь писать в файл с языком -> notifies
 */
// export const penis = "anal"

/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import BonusCasePopup from "app/components/popup/common/BonusCasePopup"
import LevelDescPopup from "app/components/popup/common/LevelDescPopup"
import Table from "app/components/formatting/table"
import BonusContestPopup from "app/components/popup/common/BonusContestPopup"
import WeaponRejectedPopup from "app/components/popup/common/WeaponRejectedPopup"
import WhatIsBonusPopup from "app/components/popup/common/WhatIsBonusPopup"
import WheelBonusPopup from "app/components/popup/common/WheelBonusPopup"
import WithdrawPopup from "app/components/popup/common/WithdrawPopup"
import Button from "app/components/UI/Button"
import Popup from "app/controllers/Popup"
import { WeaponDropProps } from "../../resources/interfaces/weapon"

const weaponDrop: WeaponDropProps = {
  id: 12,
  type: 0,
  status: 0,
  item: {
    id: 11,
    name: "asd", price: 2, subname: "asd", class_name: "uncommon",
    StatTrack: 1
  }
}

export default () => (
  <div style={{ padding: "2.5em 25%" }}>
    <Table thead="Название окна, Открыть окно">
      <tr><td>BonusContestPopup</td><td><Button style={{ marginLeft: "auto" }} color="blue" onClick={() => Popup.open(BonusContestPopup)}>Открыть</Button></td></tr>
      <tr><td>WeaponRejectedPopup</td><td><Button style={{ marginLeft: "auto" }} color="blue" onClick={() => Popup.open(WeaponRejectedPopup)}>Открыть</Button></td></tr>
      <tr><td>WhatIsBonusPopup</td><td><Button style={{ marginLeft: "auto" }} color="blue" onClick={() => Popup.open(WhatIsBonusPopup)}>Открыть</Button></td></tr>
      <tr><td>WheelBonusPopup</td><td><Button style={{ marginLeft: "auto" }} color="blue" onClick={() => Popup.open(WheelBonusPopup, { id: 10 })}>Открыть</Button></td></tr>
      <tr><td>WithdrawPopup</td><td><Button style={{ marginLeft: "auto" }} color="blue" onClick={() => Popup.open(WithdrawPopup, { weaponDrop, onWithdraw() { } })}>Открыть</Button></td></tr>
      <tr><td>BonusCasePopup</td><td><Button style={{ marginLeft: "auto" }} color="blue" onClick={() => Popup.open(BonusCasePopup, { time: "123" })}>Открыть</Button></td></tr>
      <tr><td>LevelDescPopup</td><td><Button style={{ marginLeft: "auto" }} color="blue" onClick={() => Popup.open(LevelDescPopup)}>Открыть</Button></td></tr>
      <tr><td>BonusContestPopup</td><td><Button style={{ marginLeft: "auto" }} color="blue" onClick={() => Popup.open(BonusContestPopup)}>Открыть</Button></td></tr>
    </Table>
  </div>
)
