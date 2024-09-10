import type { Middleware } from "../../types/middleware.types";

// express middleware that logs the request method and path
export const logRequests: Middleware = (req, res, next) => {
	console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
	next();
};
