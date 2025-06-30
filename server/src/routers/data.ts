import { Router } from "express";
import { isAuthorized } from "../lib/auth/is-authorized";

/**
 * @todo start without error handling, work on that later
 * @deprecated use trpc resolvers instead of router endpoints for data queries
 * and mutations  */
export const dataRouter = Router({ mergeParams: true });
dataRouter.use(isAuthorized);
