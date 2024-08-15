import { Router } from "express";

export const mainRouter = Router({ mergeParams: true });

mainRouter.get("/", (_, res) => {
	res.json({ message: "GET / successful" });
});
