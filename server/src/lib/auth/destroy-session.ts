import { TRPCError } from "@trpc/server";
import type { Request, Response } from "express";
import { sessionCookieName } from "../redis/redis-client";

/** Destroy the active express session, if it exists to begin with. */
export async function destroySession({ req, res }: { req: Request; res: Response }) {
	try {
		if (!req.session?.user?.user_id) {
			return null;
		}

		res.clearCookie(sessionCookieName);
		req.session.destroy(() => {});

		if (!req.session?.user?.user_id) {
			return null;
		} else {
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Session could not be destroyed.",
			});
		}
	} catch (error) {
		throw new TRPCError({
			code: "INTERNAL_SERVER_ERROR",
			message:
				error instanceof Error
					? error.message
					: "An error occurred while destroying the session.",
		});
	}
}
