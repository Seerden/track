import { Request, Response } from "express";
import { sessionCookieName } from "../../helpers/redis/redis-client";

/** Destroy the active express session, if it exists to begin with. */
export async function destroySession({ req, res }: { req: Request; res: Response }) {
	try {
		if (!req.session?.user_id) {
			return res.json({ message: "There is no session." });
		}

		res.clearCookie(sessionCookieName);
		req.session.destroy(() => {});

		if (!req.session?.user_id) {
			return res.json({ message: "Logged out" });
		} else {
			throw new Error("Failed to destroy session.");
		}
	} catch (error) {
		return res.status(500).json({ error });
	}
}
