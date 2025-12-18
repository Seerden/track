import { publicProcedure } from "@/lib/trpc/procedures/public.procedure";

export const meQuery = publicProcedure.query(async ({ ctx }) => {
	// TODO: auth context (get from `dash`)
	const user = ctx.user;
	if (!user) {
		return { user: null, message: "No active user." };
	}

	// TODO: is this how we get the user from from the better auth session?
	const session = ctx.session;
	console.log({ session });

	return {
		// user: await queryUserbyId({ user_id: user.user_id }),
		user: ctx.user,
		message: "User retrieved successfully.",
	};
});
