import type { Request, Response } from "express";

/**
 * @note Maybe we should leave the "bail" part of this to the call site,
 * because, since this thing isn't actually middleware, the typing isn't robust
 * enough to know not to pass on to the rest of the logic, so when we forget to
 * wrap, at the call site, the query handler with an if (user_id) ..., we could
 * get a "cannot send headers after being sent ..." error.
 */
export const getUserIdFromSessionOrBail = (req: Request, res: Response) => {
	const user_id = req.session.user?.user_id;

	if (!user_id) {
		res.status(401).json({ error: "Unauthorized" });
		return;
	}

	return user_id;
};
