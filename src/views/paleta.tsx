/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "assets/scss/views/paleta.scss"

namespace Paleta {
  export interface Color {
    name: string
    hue: number
    shades: Shade[]
  }

  export interface Shade {
    saturation: number
    lightness: number
  }

  export class Controller {
    private static store = []
    addColor(name: string, hue: number) {
      // localStorage.setItem("colors",)
    }

    public get colors(): Color[] {
      const rawData = localStorage.getItem("colors")
      if (rawData) {
        return JSON.parse(rawData)
      }
      return []
    }
  }
}

export default () => {
  const paleta = new Paleta.Controller()
  return (
    <div className="paleta">
      <div className="paleta-colors">
        {paleta.colors.map((color, index) => (
          <li className="paleta-colors__color" key={"color_" + index}>{color.name}</li>
        ))}
      </div>
      {/* <Button onClick={() => paleta.addColor()}>Add color</Button> */}
    </div>
  )
}
