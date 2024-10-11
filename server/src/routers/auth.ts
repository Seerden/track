import { Router } from "express";
import { type NewUser, type UserLogin } from "../../types/data/user.types";
import { destroySession } from "../lib/auth/destroy-session";
import { login } from "../lib/auth/log-in";
import { createUser } from "../lib/data/insert-user";
import { getUserById } from "../lib/data/query-user";

export const authRouter = Router({ mergeParams: true });

authRouter.get("/me", async (req, res) => {
	if (!req.session?.user?.user_id) {
		return res.status(401).json({ user: null, message: "No active user." });
	}

	return res
		.status(200)
		.json({ user: await getUserById({ user_id: req.session.user.user_id }) });
});

authRouter.post("/logout", async (req, res) => {
	await destroySession({ req, res });
});

authRouter.post("/login", async (req, res) => {
	const { user } = req.body as { user: UserLogin };
	await login(user, req, res);
});

authRouter.post("/register", async (req, res) => {
	const { newUser } = req.body as { newUser: NewUser };

	const registeredUser = await createUser({ newUser });

	if (!registeredUser) {
		return res.status(400).json({ message: "Registration failed." });
	}

	await login(newUser, req, res);
	return res.status(200).json({ user: registeredUser });
});
