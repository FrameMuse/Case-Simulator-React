/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import usePopupContext from "../../../../resources/hooks/usePopupContext"
import Button from "../../UI/Button"
import Flex from "../../UI/Flex"
import { PopupArticle, PopupDefaultLayout } from "../PopupProvider"

export default function WithdrawErrorPopup(props: { value: number }) {
  const { Resolve } = usePopupContext()
  return (
    <PopupDefaultLayout width="52em">
      <PopupArticle title="Предмет не доступен для вывода">
        <em>Данный предмет недоступен для вывода так как его цена на рынке не превышает </em>
        <span className="yellow-color">{props.value}</span>
        <span className="white-color"> голды</span>
      </PopupArticle>
      <Flex style={{ columnGap: "1em", marginTop: "1em" }}>
        <Button color="yellow" padding="1.5em 3.5em">Да</Button>
        <Button padding="1.5em 3.5em" onClick={Resolve}>Нет</Button>
      </Flex>
    </PopupDefaultLayout>
  )
}
