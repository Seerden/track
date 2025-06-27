import type { Middleware } from "../../../types/middleware.types";

// TODO: this can be removed once we have an analogous implementation in the
// trpc router.
// express middleware to check if user from query is same as user in session
export const isAuthorized: Middleware = (req, res, next) => {
	const user_id = req.query.user_id;
	const session_user_id = req.session.user?.user_id;

	if (!user_id || !session_user_id || user_id !== session_user_id) {
		return res.status(401).send("Unauthorized");
	}

	next();
};
