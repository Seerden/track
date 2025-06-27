import { publicProcedure } from "@/lib/trpc/procedures/public.procedure";
import type { User } from "@shared/types/data/user.types";
import { TRPCError } from "@trpc/server";
import { produce } from "immer";

export const authenticatedProcedure = publicProcedure.use(async (opts) => {
	if (!opts.ctx.req.session.user) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "Must be logged in to access this resource.",
		});
	} else {
		return opts.next(
			produce(opts, (draft) => {
				draft.ctx.req.session.destroy = opts.ctx.req.session.destroy;
				draft.ctx.req.session.user = opts.ctx.req.session.user as User;
			}),
		);
	}
});
