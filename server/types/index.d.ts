import "express-session";

declare module "express-session" {
	export interface SessionData {
		user_id?: number;
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
