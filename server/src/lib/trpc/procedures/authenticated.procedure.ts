import { publicProcedure } from "@/lib/trpc/procedures/public.procedure";
import type { User } from "@shared/lib/schemas/user";
import { TRPCError } from "@trpc/server";
import type { Session, SessionData } from "express-session";

export const authenticatedProcedure = publicProcedure.use(async (opts) => {
	if (!opts.ctx.req.session.user) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "Must be logged in to access this resource.",
		});
	}

	// NOTE: this destructuring is a mess, but if we use something like an
	// immer produce() function, the type is not properly overwritten (i.e.
	// the authenticatedProcedure context will have a user that is not assumed
	// to always be defined)
	return opts.next({
		...opts,
		ctx: {
			...opts.ctx,
			req: {
				...opts.ctx.req,
				session: {
					...opts.ctx.req.session,
					user: opts.ctx.req.session.user as User,
					save: opts.ctx.req.session.save.bind(opts.ctx.req.session),
					destroy: opts.ctx.req.session.destroy.bind(opts.ctx.req.session),
				} as Session & SessionData,
			},
			user_id: opts.ctx.req.session.user?.user_id,
		},
	});
});
