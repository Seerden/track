import { sentryRouter } from "@/routers/sentry";
import { authRouter } from "./auth";
import { dataRouter } from "./data";
import { mainRouter } from "./main";

export const routers = {
	index: mainRouter,
	auth: authRouter,
	data: dataRouter,
	sentry: sentryRouter,
};
