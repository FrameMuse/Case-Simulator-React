export type MapActions<T> = { [K in keyof T]: { type: K; payload: T[K] } }
export type InferActions<T> = MapActions<T>[keyof MapActions<T>]

interface actions {
  EVENT: {
    a: "asd"
  }
}

const initialState: any = {}

export default (state = initialState, action: InferActions<actions>): typeof initialState => {
  switch (action.type) {

    case "EVENT":
      return { ...state, ...action.payload }

    default:
      return state
  }
}