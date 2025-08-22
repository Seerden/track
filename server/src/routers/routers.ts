import { sentryRouter } from "@/routers/sentry";
import { dataRouter } from "./data";
import { mainRouter } from "./main";

export const routers = {
	index: mainRouter,
	data: dataRouter,
	sentry: sentryRouter
};
