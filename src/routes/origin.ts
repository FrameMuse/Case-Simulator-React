/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { Route, view } from "../app/Router"

Route.path("/", view("home"), ["ExactPath"])
Route.path("/case/:caseId", view("case"), ["ExactPath"])
Route.path("/wheel/:wheelId", view("wheel"), ["DemoExclude"])
Route.path("/upgrade", view("upgrade"), ["ExactPath", "DemoExclude"])
Route.path("/contract", view("contract"), ["ExactPath", "DemoExclude"])
Route.path("/bonuses", view("bonuses"), ["ExactPath", "DemoExclude"])
Route.path("/top", view("top"), ["DemoExclude"])
Route.path("/support", view("support"))
// Route.path("/payment", view("payment"), ["DemoExclude"])

export const BonusAccessPoint = String(Math.random()).slice(2, 12)
Route.path("/bonus!" + BonusAccessPoint, view("bonusCase"), ["ExactPath"])

Route.path("/profile/:userId([0-9]+)", view("profile-another"), ["ExactPath"])
Route.path("/profile", view("profile"))

Route.path("/battles/:battleHash", view("battle"), ["DemoExclude"])
Route.path("/battles", view("battles"), ["ExactPath", "DemoExclude"])

Route.path("/privacy", view("privacy"))
Route.path("/terms-contacts", view("terms-contacts"))

if (process.env.NODE_ENV === "development") {
  Route.path("/paleta", view("paleta"))
  Route.path("/errors", view("errors"))
}

// Errors
Route.path("", view("errors/404"))


