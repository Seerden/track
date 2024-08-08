import { Router } from "express";

export const indexRouter = Router({ mergeParams: true });

indexRouter.get("/", (_, res) => {
	res.json({ message: "GET / successful" });
});
