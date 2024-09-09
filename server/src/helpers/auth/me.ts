import { Request, Response } from "express";
import { getUserById } from "../data/query-user";

/** Request handler that returns the active user, or an error message. */
export async function getMe({ req, res }: { req: Request; res: Response }) {
	if (req.session?.user?.user_id) {
		return res
			.status(200)
			.json({ user: await getUserById({ user_id: req.session.user.user_id }) });
	}

	return res.status(401).json({ user: null, message: "No active user." });
}
