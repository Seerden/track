import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { UserLogin } from "../../../types/data/user.types";
import { getUserByName } from "../data/query-user";
import { destroySession } from "./destroy-session";

/** Request handler. If login info is valid, (re-)set the session. */
export async function login(user: UserLogin, req: Request, res: Response) {
	const foundUser = await getUserByName({ username: user.username });

	if (!foundUser) {
		return res.status(404).json({ message: "No user found for given credentials." });
	}

	const passwordMatches = await compare(user.password, foundUser.password_hash);

	if (!passwordMatches) {
		return destroySession({ req, res });
	}

	req.session.user = { user_id: foundUser.user_id, username: foundUser.username }; // could also regenerate()
	return res.status(200).json({ user: foundUser });
}
