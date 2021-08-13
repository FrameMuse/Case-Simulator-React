/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { RegularObject } from "../../resources/interfaces/Object"

class JsonEditor {
  filepath: string
  constructor(filepath: string) {
    this.filepath = filepath
  }

  edit<T extends RegularObject = {}, K = unknown>(selector: (value: T) => K, newValue: K) {
    const Object = require(this.filepath)
    return selector({ ...Object })
  }
}

export class LangEditor {
  static filepath = "../../assets/lang/ru.json"

  static edit<T extends RegularObject = {}, K = unknown>(selector: (value: T) => K, newValue: K) {
    const Object = require(this.filepath)
    return selector({ ...Object })
  }
}

export default JsonEditor
