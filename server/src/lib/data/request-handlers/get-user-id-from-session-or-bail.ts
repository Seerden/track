import type { Request, Response } from "express";

export const getUserIdFromSessionOrBail = (req: Request, res: Response) => {
	const user_id = req.session.user?.user_id;

	if (!user_id) {
		res.status(401).json({ error: "Unauthorized" });
		return;
	}

	return user_id;
};
