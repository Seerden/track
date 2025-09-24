import { queryUserbyId } from "@/lib/data/models/user/query-user";
import { publicProcedure } from "@/lib/trpc/procedures/public.procedure";

export const me = publicProcedure.query(async ({ ctx }) => {
	console.log("In me resolver");

	// TODO: auth context (get from `dash`)
	const user = ctx.req.session.user;
	if (!user) {
		return { user: null, message: "No active user." };
	}
	return {
		user: await queryUserbyId({ user_id: user.user_id }),
		message: "User retrieved successfully.",
	};
});
