/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// IMAGES
import ZeroCasesPNG from "assets/images/stats/zero_cases.png"
import PNGEmpty from "assets/images/icons/empty.png"
// STAFF
import Translation from "../app/controllers/Translation"
import { IndexedArray } from "./interfaces/Array"
import { RegularObject } from "./interfaces/Object"
import HTMLParse, { HTMLReactParserOptions } from "html-react-parser"
import { createElement } from "react"
import { Link } from "react-router-dom"

/**
 * 
 * @param number - dependency 1
 * @param digits - count of digits to get
 * @param power - random heart, dependency 2
 * @returns 
 */
export const getMockRandom = (number: number, digits = -2, power = 1.123) => Number(String(number ** power).slice(-digits))

export function download(filename: string, text: string) {
  const element = document.createElement("a")
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text))
  element.setAttribute("download", filename)

  element.style.display = "none"
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

export function getWeaponImage(id?: number, emptyImage?: boolean) {
  if (id && id > 0) {
    return "/assets/images/weapons/" + id + ".png"
  }

  if (emptyImage) {
    return PNGEmpty
  }

  return "/assets/images/weapon.png"
}

export function getBonusImage(id?: number) {
  if (id && id > 0) {
    return "/assets/images/wheel/items/" + "ru" + "/" + id + ".png"
  }

  return ZeroCasesPNG
}

export function getBonusInfo(id: number) {
  const { bonuses } = Translation.get()

  const image = getBonusImage(id)
  const title = bonuses[id]

  return [image, title]
}

export function getCaseImage(id?: number) {
  if (id == null) {
    return PNGEmpty
  }
  return "/assets/images/cases/id_" + id + ".png"
}

export function getRankImage(rank: number) {
  return require("../assets/images/ranks/" + rank + ".png").default
}

export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * max) + min
}

export function getRandomChars(length: number) {
  const chars = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "[", "]", ",", ".", "/", "|", ";", ":"]
  // const letters = [""]
  // return Math.floor(Math.random() * max) + min
}

/*
* URL.createObjectURL()
*/

const options: HTMLReactParserOptions = {
  htmlparser2: {
    lowerCaseTags: false
  },
  replace: (domNode: any) => {
    if (domNode.name === "link") {
      return createElement(Link, domNode.attribs)
    }
  }
}
export function inter(text?: string, Vars?: Record<string, string | number | undefined>) {
  if (!text) {
    return ""
  }

  if (Vars) {
    for (const Var in Vars) {
      if (Object.prototype.hasOwnProperty.call(Vars, Var)) {
        text = text.replace(new RegExp("\\$" + Var, "g"), String(Vars[Var]))
      }
    }
  }

  // Search for HTML symbols
  if (text.search(/<.*>/)) {
    return HTMLParse(text, options)
  }

  return text
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function isVideo(file: string): boolean {
  const file_ext = file.split(".").pop()
  const video_exts = ["mpg", "fl4", "mpeg", "webm", "mov", "moov", "avi", "mp4", "3gp"]

  return video_exts.includes(file_ext!)
}


// DEPRECATED
export function clickElementWithId(id: string) {
  const element = document.getElementById(id)
  element && element!.click()
  return delay(0)
}

export function scrollIntoView(id: string, smooth = true): void {

  if (typeof id === "string") {
    const element: HTMLElement | null = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "center",
        inline: "center"
      })
    }
  }
}

export function getlast<A = unknown>(list: A[]): A | undefined {
  const lastIndex = list.length - 1
  const lastElement = list[lastIndex]

  return lastElement

  return list.slice(-1)[0]
}

export function stopBubbling(event: any) {
  event.preventDefault()
  event.stopPropagation()

  if (event instanceof Event) {
    event.cancelBubble = true
  }

  return undefined
}

export function areEquivalent(a: any, b: any): boolean {
  // Create arrays of property names
  const aProps = Object.getOwnPropertyNames(a)
  const bProps = Object.getOwnPropertyNames(b)

  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length !== bProps.length) {
    return false
  }

  for (let i = 0; i < aProps.length; i++) {
    const propName: any = aProps[i]

    // If values of same property are not equal,
    // objects are not equivalent
    if (a[propName] !== b[propName]) {
      return false
    }
  }

  // If we made it this far, objects
  // are considered equivalent
  return true
}

export function FormCollection(form: any) {
  const collection: any = {}

  Array(form.elements).map(function (element: any) {
    // console.log(element);

    return {
      [element.name]: element.value
    }
  })

  for (const key in form.elements) {
    const element = form.elements[key]
    collection[element.name] = element.value
  }

  return collection
}

export function IndexArray(array: Array<object>, extra?: object): IndexedArray {
  return array.map((item, index) => ({ ...item, ...extra, index }))
}

export function CreateQuery(QueryObject: RegularObject): string {
  if (!QueryObject) {
    throw new Error("QueryObject is empty")
  }

  const QueryKeys = Object.keys(QueryObject)
  const QueryArray = QueryKeys.map(function (key) {
    const value = QueryObject[key]
    return value ? escape(key) + "=" + escape(value) : ""
  })

  return QueryArray.filter(query => query).join("&")
}

export function limit(value: number, min = 0, max = 0) {
  if (min && value < min) return min
  if (max && value > max) return max

  return value
}

export function qsort(array: number[]): number[] {
  if (array.length < 2) return array

  const left = []
  const right = []

  const pivot = array[0]

  for (let i = 1; i < array.length; i++) {
    if (pivot > array[i]) {
      left.push(array[i])
    } else {
      right.push(array[i])
    }
  }

  return [...qsort(left), pivot, ...qsort(right)]
}

export function* getStepGenerator(max: number, callback: (step: number | null) => void): Generator<any, any, any> {
  while (true) {
    for (let step = 0; step <= max; step++) {
      if ((yield null) === "rewind") {
        step = 0
        callback(null)
        break
      }
      yield step
      callback(step)
    }
  }

}

/**
 * 
 * @param p1 current time
 * @param start start value
 * @param increment change in value
 * @param p2 duration
 */
export function easeInOutQuad(p1: number, p2: number, increment = 0, start = 0) {
  p1 /= p2 / 2

  if (p1 < 1) {
    return (increment / 2) * (p1 ** 2) + start
  } else {
    p1--
    return (-increment / 2) * (p1 * (p1 - 2) - 1) + start
  }
}

// window.easeInOutQuad = easeInOutQuad


export const scrollDown = (element: any) => element && element.scrollBy(0, 10 ** 10)
export const sliceTime = (created_at: any) => created_at.slice(11, 17)

export const toLocaleDate = (date: string | number) => (new Date(typeof date === "string" ? date + " UTC" : date)).toLocaleString()

export function unescapeHTMLEnteriesSafe(chars: string) {
  const test = document.createElement("textarea")
  test.innerHTML = chars
  test.remove()
  return test.value
}

export function unescapeHTMLEnteries(string: string) {
  const test = document.createElement("textarea")
  test.innerHTML = string
  // test.remove()
  return test.innerHTML
}

/**
 * Creates class with modifiers
 * 
 * Join modifiers with className and returns one
 * @param className - origin class
 * @param modifiers - class modifiers
 */
export function classWithModifiers(className: string, modifiers: Array<string | number | false | null | undefined> | undefined) {
  if (!modifiers || !modifiers.length) {
    return className
  }

  modifiers = modifiers.filter(modifier => modifier) // Map modified classes

  if (!modifiers.length) {
    return className
  }

  const space = " "
  const separator = "--"

  modifiers = modifiers.map(modifier => className + separator + modifier) // Map modified classes

  return className + space + modifiers.join(space) // Join all together
}

/**
 * Assignes classes
 * 
 * @param classNames - Classes to assign
 */
export function classAssign(classNames: Array<string | undefined>) {
  const space = " "

  return classNames.filter(className => className).join(space)
}
