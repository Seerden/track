import "express-session";

declare module "express-session" {
	export interface SessionData {
		user?: {
			user_id: number;
			username: string;
		};
	}
}

declare namespace Express {
	interface Request {
		user: {
			username: string;
			user_id: number;
		};
	}
}
