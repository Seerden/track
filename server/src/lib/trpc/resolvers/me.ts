import { queryUserbyId } from "@/lib/data/models/user/query-user";
import { publicProcedure } from "@/lib/trpc/procedures/public.procedure";

export const me = publicProcedure.query(async ({ ctx }) => {
	// TODO: auth context (get from `dash`)
	const user = ctx.req.session.user;
	if (!user) {
		return { user: null, message: "No active user." };
	}

	// TODO: is this how we get the user from from the better auth session?
	const session = ctx.session;
	console.log({ session });

	return {
		user: await queryUserbyId({ user_id: user.user_id }),
		betterAuthSessionUser: ctx.user,
		message: "User retrieved successfully.",
	};
});
