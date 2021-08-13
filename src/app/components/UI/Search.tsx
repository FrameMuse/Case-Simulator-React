/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SVG
import useTranslation from "resources/hooks/useTranslation"
import { ReactComponent as SVGSearch } from "../../../assets/svg/search.svg"
import Input, { InputProps } from "./Input"

interface SearchProps {
  className?: string
  placeholder?: string
  // onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function Search(props: SearchProps & InputProps) {
  const general = useTranslation(trans => trans.general)
  return (
    <Input
      icon={<SVGSearch />}
      placeholder={general.searchPlaceholder}
      {...props}
    />
  )
}

export default Search
