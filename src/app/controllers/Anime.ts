/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { easeInOutQuad } from "../../resources/utils"


export default class Anime<C extends Function = Function> {
  private callback: C;
  private subscribed: boolean
  public constructor(callback: C) {
    this.subscribed = true
    this.callback = callback
  }

  public start(increment = 0, duration = 0) {
    
    const start = 0
    let currentTime = 0
    return new Promise<void>((resolve) => {
      
      if (this.subscribed === false) {
        return resolve()
      }
      
      const animate = () => {
        if (currentTime < duration) {
          currentTime += easeInOutQuad(currentTime, start, increment, duration) + increment
          setTimeout(animate, increment)
          this.callback()
        } else {
          resolve()
        }
      }

      animate()
    })
  }

  public unsubscribe() {
    this.callback = (() => { }) as unknown as C
    this.subscribed = false
  }
}
