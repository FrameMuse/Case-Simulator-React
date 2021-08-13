/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import Fetch from "../../controllers/Fetch"
import { PureComponent } from "react"
import { RegularObject } from "../../../resources/interfaces/Object"

interface PagingComponentState<DataType> extends RegularObject {
  isLoaded: boolean | null;
  current_page: number;
  data: Array<DataType>;
  first_page_url: string | null;
  from: number;
  last_page: number;
  last_page_url: string | null;
  next_page_url: string | null;
  path: string | null;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

abstract class PagingComponent<DataType, P = {}> extends PureComponent<P> {
  public state: Required<PagingComponentState<DataType>> = {
    isLoaded: null,
    current_page: 0,
    data: [],
    first_page_url: null,
    from: 0,
    last_page: 0,
    last_page_url: null,
    next_page_url: null,
    path: null,
    per_page: 0,
    prev_page_url: null,
    to: 0,
    total: 0
  }
  protected setPage(page: "first" | "last" | "next" | "prev") {
    const url = this.state[page + "_page_url"]
    if (url !== null) {
      // Start loading
      this.setState({ isLoaded: false })
      // Make request to the first page
      fetch(url)
        .then(Fetch.json, Fetch.error)
        // Save data and finish loading
        .then(paging => this.setState({ paging, isLoaded: true }))
    }
  }
}

export default PagingComponent
