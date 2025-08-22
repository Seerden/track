import type { Request, Response } from "express";
import { queryUserbyId } from "@/lib/data/models/user/query-user";

/** Request handler that returns the active user, or an error message. */
export async function getMe({ req, res }: { req: Request; res: Response }) {
	const user_id = req.session?.user?.user_id;

	if (user_id) {
		return res.status(200).json({ user: await queryUserbyId({ user_id }) });
	}

	// TODO: this should probably still be a 200, because not being logged in
	// isn't an error. Then we can gracefully handle the not-logged-in case in
	// the client.
	return res.status(401).json({ user: null, message: "No active user." });
}
