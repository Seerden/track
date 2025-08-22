import { TRPCError } from "@trpc/server";
import { sessionCookieName } from "@/lib/redis/redis-client";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const logout = authenticatedProcedure.mutation(
	async ({ ctx: { req, res } }) => {
		try {
			if (!req.session?.user?.user_id) {
				return null;
			}

			// @ts-ignore I guess since the user is defined (because we're in
			// authenticatedProcedure, it can't be undefined here, but after this
			// is called, we won't be in authenticatedProcedure anymore, so user
			// will be undefined again)
			req.session.user = undefined;
			console.log({ sess: req.session, a: 1 });

			res.clearCookie(sessionCookieName);

			// stupid express-session code
			// biome-ignore lint/suspicious/noEmptyBlockStatements: ^
			req.session.destroy(() => {});

			if (!req.session?.user) {
				return { success: true, message: "Session destroyed successfully." };
			} else {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Session could not be destroyed.",
				});
			}
		} catch (error) {
			console.error(error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message:
					error instanceof Error
						? error.message
						: "An error occurred while destroying the session.",
			});
		}
	},
);
