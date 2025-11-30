import { fromNodeHeaders } from "better-auth/node";
import { Router } from "express";
import { auth } from "@/auth";

export const mainRouter = Router({ mergeParams: true });

mainRouter.get("/", (_, res) => {
	res.json({ message: "GET / successful" });
});

mainRouter.get("/me", (req, res) => {
	const user = auth.api.getSession({
		headers: fromNodeHeaders(req.headers),
	});

	res.json({ user });
});
