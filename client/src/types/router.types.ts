// export flat paths as a type so we can use it instead of hardcoding strings --

import type { createRouter } from "@/router";

// makes it easier to rename routes without having to type-check.
type Router = ReturnType<typeof createRouter>;
export type RoutesByPath = Router["routesByPath"];
export type FlatPaths = keyof RoutesByPath;
