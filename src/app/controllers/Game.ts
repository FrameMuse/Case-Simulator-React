/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/


type GameStatus = "waiting" | "running" | "finished"
interface GameState {
  status: GameStatus,
}
class GameController {
  
}

// export class GameComponent<P = {}, S = {}, SS = any, GS = GameState> extends PureComponent<P, S & GS, SS> {
//   // initState: S & GS = {}
//   state: S & GS = {
//     status: "waiting",
//     ...this.initState
//   }

//   reset() {
//     this.setState(this.initState)
//   }
// }

export default GameController
