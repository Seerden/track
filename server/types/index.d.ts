import type { ID } from "@shared/types/data/utility.types";
import "express-session";

declare module "express-session" {
	export interface SessionData {
		user?: {
			user_id: ID;
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
