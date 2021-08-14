import type { CompileActions } from "react-nuts/src/interfaces/Reducer"

interface actions {
  EVENT: {
    a: "asd"
  }
}

const initialState: any = {}

export default (state = initialState, action: CompileActions<actions>): typeof initialState => {
  switch (action.type) {

    case "EVENT":
      return { ...state, ...action.payload }

    default:
      return state
  }
}