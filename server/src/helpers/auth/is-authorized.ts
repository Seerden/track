import type { NextFunction, Request, Response } from "express";

// TODO: export if needed elsewhere
type Middleware = (req: Request, res: Response, next: NextFunction) => void;

// express middleware to check if user from query is same as user in session
export const isAuthorized: Middleware = (req, res, next) => {
	const userId = req.query.user_id;
	const sessionUserId = req.session.user?.user_id;

	if (!userId || !sessionUserId || +userId !== sessionUserId) {
		return res.status(401).send("Unauthorized");
	}

	next();
};
