import type { ID } from "@shared/types/data/utility.types";
import type { NextFunction, Request, Response } from "express";
import { getUserIdFromSessionOrBail } from "@/lib/data/request-handlers/get-user-id-from-session-or-bail";

export type RequestHandlerWithUserId = (
	handlerArgs: {
		req: Request;
		res: Response;
		next: NextFunction;
	},
	user_id: ID
) => void;

// TODO: use this in places 🫠
export const withUserId = (
	req: Request,
	res: Response,
	next: NextFunction,
	handler: RequestHandlerWithUserId
) => {
	const user_id = getUserIdFromSessionOrBail(req, res);
	if (user_id) {
		handler({ req, res, next }, user_id);
	}
};
