import { indexRouter } from ".";
import { authRouter } from "./auth";
import { dataRouter } from "./data";

export const routers = {
	index: indexRouter,
	auth: authRouter,
	data: dataRouter,
};
