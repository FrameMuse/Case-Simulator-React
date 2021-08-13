/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import Button from "../../app/components/UI/Button"
import useTranslation from "resources/hooks/useTranslation"
import { Article } from "app/components/formatting/article"
import { useHistory } from "react-router"

function DailyPrize() {
  const daily = useTranslation(trans => trans.views.top.daily)
  const history = useHistory()
  return (
    <div className="top-daily">
      <div className="top-daily__prize">
        <h3 className="top-daily__title">{daily.title}</h3>
        <div className="top-daily__prize-number">{(1000).toPrice()}</div>
        <p className="top-daily__text">
          {daily.desc?.[0]} <em>{(500).toPrice()}</em> {daily.desc?.[1]} <em>{(250).toPrice()}</em> {daily.desc?.[2]}
        </p>
      </div>
      <div className="top-daily__info">
        {daily.articles?.map((article, index) => (
          <Article title={article?.title} className="top-article" key={"article_" + index}>
            {article?.desc}
          </Article>
        ))}
        <Button padding="1.5em 5em" color="yellow" onClick={() => history.push("/")}>{daily.button}</Button>
      </div>
    </div>
  )
}

export default DailyPrize
