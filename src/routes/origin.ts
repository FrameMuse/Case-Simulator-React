/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { Route, view } from "app/Router"

Route.path("/", view("home"), ["ExactPath"])
Route.path("/case/:caseId", view("case"), ["ExactPath"])
// Route.path("/wheel/:wheelId", view("wheel"), ["DemoExclude"])
// Route.path("/upgrade", view("upgrade"), ["ExactPath", "DemoExclude"])
// Route.path("/contract", view("contract"), ["ExactPath", "DemoExclude"])

// Route.path("/battles/:battleHash", view("battle"), ["DemoExclude"])
// Route.path("/battles", view("battles"), ["ExactPath", "DemoExclude"])

// // Errors
// Route.path("", view("errors/404"))


