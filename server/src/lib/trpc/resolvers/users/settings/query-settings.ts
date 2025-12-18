import { queryUserSettingsById } from "@/lib/data/models/user/query-user-settings";
import { betterAuthProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const userSettingsQuery = betterAuthProcedure.query(async ({ ctx }) => {
	const user_id = ctx.user.id;

	return await queryUserSettingsById({ user_id });
});
