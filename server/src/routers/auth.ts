import { Router } from "express";
import { UserLogin } from "../../types/data/user.types";
import { destroySession } from "../helpers/auth/destroy-session";
import { login } from "../helpers/auth/log-in";
import { getUserById } from "../helpers/data/query-user";

export const authRouter = Router({ mergeParams: true });

authRouter.get("/me", async (req, res) => {
	if (req.session?.user_id) {
		return res
			.status(200)
			.json({ user: await getUserById({ user_id: req.session.user_id }) });
	}

	return res.status(401).json({ user: null, message: "No active user." });
});

authRouter.post("/logout", async (req, res) => {
	await destroySession({ req, res });
});

authRouter.post("/login", async (req, res) => {
	const { user } = req.body as { user: UserLogin };
	await login(user, req, res);
});

authRouter.post("/logout", async (req, res) => {});