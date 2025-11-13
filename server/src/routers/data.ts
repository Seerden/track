import { Router } from "express";
import { pushRouter } from "@/routers/push";

/**
 * @todo start without error handling, work on that later
 */
export const dataRouter = Router({ mergeParams: true });
dataRouter.use("/push", pushRouter);
