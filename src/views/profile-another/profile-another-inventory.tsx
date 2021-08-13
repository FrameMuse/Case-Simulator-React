/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import ContractBox from "../../app/components/Standoff/ContractBox"
import SwitchContent, { SwitchContentRoute } from "../../app/components/other/SwitchContent"
import MutuableQuery, { QueryProvider } from "../../app/components/other/MutuableQuery"
import { QueryPagination } from "../../app/features/Query/QueryPagination"
import { fetchBattles, fetchUpgrades, fetchUserBonuses, getUserContracts, getUserInventory } from "../../app/api/actions"
import UpgradeBox from "../../app/components/Standoff/UpgradeBox"
import BattleBox from "../../app/components/Standoff/BattleBox"
import ProfileDrop from "views/profile/drop"
import { BonusesContainer } from "views/profile/bonuses"
import useTranslation from "resources/hooks/useTranslation"

export default function ProfileAnotherInventory({ userId }: { userId: number }) {
  const trans = useTranslation(trans => trans.views.profile)
  return (
    <SwitchContent menu={trans.anotherMenu || []}>
      <SwitchContentRoute path={trans.anotherMenu?.[0]}>
        <MutuableQuery animated action={getUserInventory(userId, "history")}>
          {({ payload }) => (
            <QueryPagination use="items">
              <div className="weapons-container">
                {payload.items.data.map((drop, index) => (
                  <ProfileDrop {...drop} key={"weapon_" + index} />
                ))}
              </div>
            </QueryPagination>
          )}
        </MutuableQuery>
      </SwitchContentRoute>
      <SwitchContentRoute path={trans.anotherMenu?.[1]}>
        <MutuableQuery animated action={getUserContracts(userId)}>
          {({ payload }) => (
            <QueryPagination>
              <div className="contract-container">
                {payload.data.map((contract, index) => (
                  <ContractBox key={"contract_" + index} {...contract} item={contract.win_item} weaponList={contract.item_list} />
                ))}
              </div>
            </QueryPagination>
          )}
        </MutuableQuery>
      </SwitchContentRoute>
      <SwitchContentRoute path={trans.anotherMenu?.[2]}>
        <MutuableQuery action={fetchBattles(userId)}>
          {({ payload }) => (
            <QueryPagination>
              <div className="upgrades-container">
                {payload.data.map((battle, index) => (
                  <BattleBox key={"battle_" + index} {...battle} {...battle} />
                ))}
              </div>
            </QueryPagination>
          )}
        </MutuableQuery>
      </SwitchContentRoute>
      <SwitchContentRoute path={trans.anotherMenu?.[3]}>
        <MutuableQuery action={fetchUpgrades(userId)}>
          {({ payload }) => (
            <QueryPagination>
              <div className="upgrades-container">
                {payload.data.map((upgrade, index) => (
                  <UpgradeBox key={"upgrade_" + index} {...upgrade} />
                ))}
              </div>
            </QueryPagination>
          )}
        </MutuableQuery>
      </SwitchContentRoute>
      <SwitchContentRoute path={trans.anotherMenu?.[4]}>
        <QueryProvider action={fetchUserBonuses(userId)}>
          <BonusesContainer noEvent />
        </QueryProvider>
      </SwitchContentRoute>
    </SwitchContent>
  )
}
