/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import TranslationSettings from "../../assets/lang/settings.json"
import _lang from "../../assets/lang/ru.json" // Must be used as a type
import { ValueOf } from "../../resources/interfaces/Object"

/**
 * Loop in object deeply and make it accessible with variables of types: string | number
 */
type P<O extends string | number | object | undefined> = {
  [K in keyof O]: O[K] extends object ? P<O[K]> & { [x in string | number]: ValueOf<O[K]> } : O[K]
}

export type TranslationJSONRaw = typeof _lang
export type TranslationJSON = P<TranslationJSONRaw>

class Translation {
  private static cache = new Map()
  public static readonly settings = TranslationSettings

  private static set lang(lang: string) {
    localStorage.setItem("lang", lang)
  }
  private static get lang() {
    return localStorage.getItem("lang") || Translation.settings.default
  }

  private static require(lang: Lowercase<string>): TranslationJSON {
    if (Translation.settings.activeLangs.includes(lang)) {
      try {
        return require("../../assets/lang/" + lang + ".json")
      } catch (error) {
        throw new Error("TranslationError: cannot require lang file: " + error.message)
      }
    } else {
      throw new Error("TranslationError: lang is not presented in settings.json")
    }
  }

  public static get(): TranslationJSON {
    return Translation.ResolveAndSave(Translation.lang)
  }

  public static getLang() {
    return this.lang
  }

  public static ResolveAndSave(lang: Lowercase<string>): TranslationJSON {
    if (!Translation.cache.has(lang)) {
      Translation.cache.set(lang, Translation.require(lang))
    }

    Translation.lang = lang

    return Translation.cache.get(lang)
  }
}

export function Translate<Selected extends object = TranslationJSON>(selector: (trans: TranslationJSON) => Selected): Partial<Selected> {
  const translation = Translation.get()
  return selector(translation) || {}
}

export default Translation
