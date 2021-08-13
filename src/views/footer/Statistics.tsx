/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../assets/scss/components/statistics.scss"
// STAFF
import { useSelector } from "react-redux"
import Icon from "../../app/components/UI/Icon"
import useTranslation from "../../resources/hooks/useTranslation"

export type stat = "battles" | "cases" | "contracts" | "online" | "users" | "upgrades"

export default function Statistics() {
  return (
    <div className="statistics">
      <StatisticsEntry icon="case-open" name="cases" />
      <StatisticsEntry icon="contract" name="contracts" />
      <StatisticsEntry icon="battle" name="battles" />
      <StatisticsEntry icon="upgrade" name="upgrades" />
      <StatisticsEntry icon="smile" name="users" />
      <StatisticsEntry icon="users" name="online" />
    </div>
  )
}

function StatisticsEntry({ icon, name }: { icon: string; name: stat }) {
  const stats = useSelector(state => state.statistics)
  const statsTrans = useTranslation(trans => trans.statistics)
  return (
    <div className="statistics__element">
      <div className="statistics__circle">
        <Icon name={icon} />
      </div>
      <div className="statistics__entry">
        <span className="statistics__value">{stats[name].toLocaleString()}</span>
        <span className="statistics__key">{statsTrans[name]}</span>
      </div>
    </div>
  )
}
