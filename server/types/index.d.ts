import type { User } from "@shared/lib/schemas/user";
import "express-session";

declare module "express-session" {
	1;
	export interface SessionData {
		user?: User;
	}
}
