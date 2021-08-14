/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// IMAGES
import Fist from "../../assets/images/icons/fist.png"
import HistoryLane from "../../assets/images/icons/history-line.png"
// STAFF
import { useHistory } from "react-router-dom"
import { fetchBattleCreate, fetchBattleJoin, fetchBattlesList, getActionT } from "app/api/actions"
import { ClientAPI } from "app/api/client"
import { Article } from "app/components/formatting/article"
import Table from "app/components/formatting/table"
import MutuableQuery, { useContextQuery } from "app/components/other/MutuableQuery"
import UserStats from "app/components/other/UserStats"
import Button from "app/components/UI/Button"
import useTranslation from "../../resources/hooks/useTranslation"
import { getCaseImage } from "../../resources/utils"
import SelectorPoints from "app/components/UI/SelectorPoints"
import { PriceRange } from "app/helpers/PriceRange"
import { useEffect, useState } from "react"
import Search from "app/components/UI/Search"
import ClientSocket from "app/socket/ClientSocket"
import { useSelector } from "react-redux"

export default () => {
  const [search, setSearch] = useState("")
  const [priceRange, setPriceRange] = useState<PriceRange | null>(null)

  const cases = useTranslation(trans => trans.cases)
  const battles = useTranslation(trans => trans.views.battles)

  /**
   * 
   * Filter predicate
   * + Drop all cases which aren't in price range
   */
  function casePriceRange(caseProps: BattleCase): boolean {
    if (!priceRange || caseProps.price <= 0) {
      return true
    }

    if (caseProps.price < priceRange.from) {
      return false
    }

    if (priceRange.to && (caseProps.price > priceRange.to)) {
      return false
    }

    return true
  }

  function caseNameSearch(caseProps: BattleCase): boolean {
    const caseTitle = cases?.[caseProps.id]?.["title"]?.toLowerCase() || [""]

    for (const letter of search.toLowerCase()) {
      if (!caseTitle.includes(letter)) {
        return false
      }
    }

    return true
  }
  return (
    <>
      <Article title={battles.article?.title}>
        {battles.article?.desc}
      </Article>
      <MutuableQuery requireAuth action={fetchBattlesList}>
        {({ payload }) => {
          const user = useSelector(state => state.user)
          const [cases, setCases] = useState(payload.cases)
          useEffect(() => {
            return ClientSocket.subscribe("BATTLES_CREATE", payload => {
              setCases(cases => {
                const Case = cases.find(Case => Case.id === payload.case_id)
                if (Case) {
                  if (user.id === payload.user_id) {
                    Case.my_battles = {
                      id: payload.battle_id
                    }
                  } else {
                    Case.battles_count += 1
                  }
                }
                return [...cases]
              })
            })
          }, [])
          useEffect(() => {
            return ClientSocket.subscribe("BATTLES_CANCEL", payload => {
              setCases(cases => {
                const Case = cases.find(Case => Case.id === payload.case_id)
                if (Case) {
                  if (user.id === payload.user_id) {
                    Case.my_battles = null
                  } else {
                    Case.battles_count -= 1
                  }
                }
                return [...cases]
              })
            })
          }, [])
          return (
            <div className="battles">
              <div className="battles__filters">
                <Search onChange={event => setSearch(event.target.value)} />
                <SelectorPoints
                  nulish
                  className="filters__filter"
                  onSelect={setPriceRange}
                  options={[
                    new PriceRange(1, 19),
                    new PriceRange(20, 49),
                    new PriceRange(50, 99),
                    new PriceRange(100)
                  ]}
                />
              </div>
              <br />
              <div className="battle__header">
                <div className="battles__user-stats">
                  <UserStats {...payload.userStats} />
                </div>
                <div className="battles__stats">

                  <div className="battles-box">
                    <div className="battles-box__circle">
                      <img src={Fist} alt="fist" className="icon" />
                    </div>
                    <div className="battles-box__entry">
                      <div className="battles-box__value">{payload.active}</div>
                      <div className="battles-box__key">{battles.stats?.active}</div>
                    </div>
                  </div>

                  <div className="battles-box">
                    <div className="battles-box__circle">
                      <img src={HistoryLane} alt="fist" className="icon" />
                    </div>
                  </div>

                </div>
              </div>
              <div className="battles__table">
                <BattlesTable free={payload.free} battleCases={cases.filter(casePriceRange).filter(caseNameSearch)} />
              </div>
              <HandleJoin />
            </div>
          )
        }}
      </MutuableQuery>
    </>
  )
}

function HandleJoin() {
  const { modifyPayload } = useContextQuery<typeof fetchBattlesList>()
  useEffect(() => {
    return ClientSocket.subscribe("BATTLES_CREATE", payload => {
      modifyPayload(state => state && ({
        ...state,
        active: state.active + 1
      }))
    })
  }, [])
  useEffect(() => {
    return ClientSocket.subscribe("BATTLES_JOIN", payload => {
      modifyPayload(state => state && ({
        ...state,
        active: state.active - 1
      }))
    })
  }, [])
  useEffect(() => {
    return ClientSocket.subscribe("BATTLES_CANCEL", payload => {
      modifyPayload(state => state && ({
        ...state,
        active: state.active - 1
      }))
    })
  }, [])
  return null
}

export interface BattleCase {
  id: number
  price: number
  battles_count: number
  my_battles: {
    id: number
  } | null
}

export function useBattleConnection() {
  const history = useHistory()

  function CreateBattle(caseId: number) {
    ClientAPI
      .query(fetchBattleCreate(caseId))
      .then(({ error, payload }) => {
        if (error || !payload) return
        history.push("/battles/playing", { ...payload, referred: true })
      })
  }

  function JoinBattle(case_id: number) {
    ClientAPI
      .query(fetchBattleJoin(case_id))
      .then(({ error, payload }) => {
        if (error || !payload) return
        history.push("/battles/playing", { ...payload, referred: true })
      })
  }

  function Connect(battle_id: number) {
    history.push("/battles/playing", { battle_id })
  }

  return {
    CreateBattle,
    JoinBattle,
    Connect
  }
}

function BattlesTable({ battleCases, free }: { battleCases: BattleCase[]; free: getActionT<typeof fetchBattlesList>["free"] }) {
  const { CreateBattle, JoinBattle, Connect } = useBattleConnection()

  const cases = useTranslation(trans => trans.cases)
  const battles = useTranslation(trans => trans.views.battles)

  return (
    <Table thead={battles.table?.menu || ["Not translated"]}>
      {battleCases.map(battle => (
        <tr key={"battle_" + battle.id}>
          <td>
            <div className="battles-case" style={{ marginRight: "5em" }}>
              <img src={getCaseImage(battle.id)} alt="" className="battles-case__image" />
              <div className="battles-case__title">{cases[battle.id]?.title}</div>
            </div>
          </td>
          <td align="center">
            <span style={{ width: "15em" }}>{battle.battles_count}</span>
          </td>
          <td align="center">{battle.price.toPrice()}</td>
          <td>
            <div className="battles__buttons">
              {Boolean(battle.battles_count) && (
                <Button color="green" onClick={() => JoinBattle(battle.id)}>{String(battles.table?.buttons?.join) + ((Number(free.enter) >= battle.price) ? battles.table?.buttons.free : "")}</Button>
              )}
              {battle.my_battles ? (
                <Button color="green" onClick={() => battle.my_battles && Connect(battle.my_battles.id)}>{battles.table?.buttons?.back}</Button>
              ) : (
                <button className="button" onClick={() => CreateBattle(battle.id)}>
                  <span className="button__text">{String(battles.table?.buttons?.create) + ((Number(free.create) >= battle.price) ? battles.table?.buttons?.free : "")}</span>
                  <div className="add-icon" style={{ marginLeft: "1rem" }}>
                    <span className="add-icon__text">+</span>
                  </div>
                </button>
              )}
            </div>
          </td>
        </tr>
      ))}
    </Table>
  )
}
