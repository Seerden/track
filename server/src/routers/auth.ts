import { createUser } from "@/lib/data/models/user/insert-user";
import { queryUserbyId } from "@/lib/data/models/user/query-user";
import { destroySession } from "@lib/auth/destroy-session";
import { login } from "@lib/auth/log-in";
import { type NewUser, type UserLogin } from "@shared/types/data/user.types";
import { Router } from "express";

export const authRouter = Router({ mergeParams: true });

// TODO: these functions all need request handler functions defined separately,
// like we do with the data router.

authRouter.get("/me", async (req, res) => {
	if (!req.session?.user?.user_id) {
		res.status(401).json({ user: null, message: "No active user." });
	} else {
		res.status(200).json({
			user: await queryUserbyId({ user_id: req.session.user.user_id }),
		});
	}
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
		res.status(400).json({ message: "Registration failed." });
	} else {
		await login(newUser, req, res);
	}
});
