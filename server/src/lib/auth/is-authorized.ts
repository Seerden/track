import type { Middleware } from "../../../types/middleware.types";

// express middleware to check if user from query is same as user in session
export const isAuthorized: Middleware = (req, res, next) => {
	const userId = req.query.user_id;
	const sessionUserId = req.session.user?.user_id;

	if (!userId || !sessionUserId || +userId !== sessionUserId) {
		return res.status(401).send("Unauthorized");
	}

	next();
};
