/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Route as rootRouteImport } from "./routes/__root"
import { Route as TodayRouteImport } from "./routes/today"
import { Route as RegisterRouteImport } from "./routes/register"
import { Route as LoginRouteImport } from "./routes/login"
import { Route as IndexRouteImport } from "./routes/index"
import { Route as ActivitiesIndexRouteImport } from "./routes/activities/index"
import { Route as NotesNewRouteImport } from "./routes/notes/new"
import { Route as HabitsNewRouteImport } from "./routes/habits/new"
import { Route as ActivitiesNewRouteImport } from "./routes/activities/new"

const TodayRoute = TodayRouteImport.update({
  id: "/today",
  path: "/today",
  getParentRoute: () => rootRouteImport,
} as any)
const RegisterRoute = RegisterRouteImport.update({
  id: "/register",
  path: "/register",
  getParentRoute: () => rootRouteImport,
} as any)
const LoginRoute = LoginRouteImport.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => rootRouteImport,
} as any)
const IndexRoute = IndexRouteImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRouteImport,
} as any)
const ActivitiesIndexRoute = ActivitiesIndexRouteImport.update({
  id: "/activities/",
  path: "/activities/",
  getParentRoute: () => rootRouteImport,
} as any)
const NotesNewRoute = NotesNewRouteImport.update({
  id: "/notes/new",
  path: "/notes/new",
  getParentRoute: () => rootRouteImport,
} as any)
const HabitsNewRoute = HabitsNewRouteImport.update({
  id: "/habits/new",
  path: "/habits/new",
  getParentRoute: () => rootRouteImport,
} as any)
const ActivitiesNewRoute = ActivitiesNewRouteImport.update({
  id: "/activities/new",
  path: "/activities/new",
  getParentRoute: () => rootRouteImport,
} as any)

export interface FileRoutesByFullPath {
  "/": typeof IndexRoute
  "/login": typeof LoginRoute
  "/register": typeof RegisterRoute
  "/today": typeof TodayRoute
  "/activities/new": typeof ActivitiesNewRoute
  "/habits/new": typeof HabitsNewRoute
  "/notes/new": typeof NotesNewRoute
  "/activities": typeof ActivitiesIndexRoute
}
export interface FileRoutesByTo {
  "/": typeof IndexRoute
  "/login": typeof LoginRoute
  "/register": typeof RegisterRoute
  "/today": typeof TodayRoute
  "/activities/new": typeof ActivitiesNewRoute
  "/habits/new": typeof HabitsNewRoute
  "/notes/new": typeof NotesNewRoute
  "/activities": typeof ActivitiesIndexRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  "/": typeof IndexRoute
  "/login": typeof LoginRoute
  "/register": typeof RegisterRoute
  "/today": typeof TodayRoute
  "/activities/new": typeof ActivitiesNewRoute
  "/habits/new": typeof HabitsNewRoute
  "/notes/new": typeof NotesNewRoute
  "/activities/": typeof ActivitiesIndexRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | "/"
    | "/login"
    | "/register"
    | "/today"
    | "/activities/new"
    | "/habits/new"
    | "/notes/new"
    | "/activities"
  fileRoutesByTo: FileRoutesByTo
  to:
    | "/"
    | "/login"
    | "/register"
    | "/today"
    | "/activities/new"
    | "/habits/new"
    | "/notes/new"
    | "/activities"
  id:
    | "__root__"
    | "/"
    | "/login"
    | "/register"
    | "/today"
    | "/activities/new"
    | "/habits/new"
    | "/notes/new"
    | "/activities/"
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  LoginRoute: typeof LoginRoute
  RegisterRoute: typeof RegisterRoute
  TodayRoute: typeof TodayRoute
  ActivitiesNewRoute: typeof ActivitiesNewRoute
  HabitsNewRoute: typeof HabitsNewRoute
  NotesNewRoute: typeof NotesNewRoute
  ActivitiesIndexRoute: typeof ActivitiesIndexRoute
}

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/today": {
      id: "/today"
      path: "/today"
      fullPath: "/today"
      preLoaderRoute: typeof TodayRouteImport
      parentRoute: typeof rootRouteImport
    }
    "/register": {
      id: "/register"
      path: "/register"
      fullPath: "/register"
      preLoaderRoute: typeof RegisterRouteImport
      parentRoute: typeof rootRouteImport
    }
    "/login": {
      id: "/login"
      path: "/login"
      fullPath: "/login"
      preLoaderRoute: typeof LoginRouteImport
      parentRoute: typeof rootRouteImport
    }
    "/": {
      id: "/"
      path: "/"
      fullPath: "/"
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    "/activities/": {
      id: "/activities/"
      path: "/activities"
      fullPath: "/activities"
      preLoaderRoute: typeof ActivitiesIndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    "/notes/new": {
      id: "/notes/new"
      path: "/notes/new"
      fullPath: "/notes/new"
      preLoaderRoute: typeof NotesNewRouteImport
      parentRoute: typeof rootRouteImport
    }
    "/habits/new": {
      id: "/habits/new"
      path: "/habits/new"
      fullPath: "/habits/new"
      preLoaderRoute: typeof HabitsNewRouteImport
      parentRoute: typeof rootRouteImport
    }
    "/activities/new": {
      id: "/activities/new"
      path: "/activities/new"
      fullPath: "/activities/new"
      preLoaderRoute: typeof ActivitiesNewRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  LoginRoute: LoginRoute,
  RegisterRoute: RegisterRoute,
  TodayRoute: TodayRoute,
  ActivitiesNewRoute: ActivitiesNewRoute,
  HabitsNewRoute: HabitsNewRoute,
  NotesNewRoute: NotesNewRoute,
  ActivitiesIndexRoute: ActivitiesIndexRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
