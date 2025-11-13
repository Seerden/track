import { queryUserSettingsById } from "@/lib/data/models/user/query-user-settings";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const queryUserSettingsResolver = authenticatedProcedure.query(
	async ({ ctx }) => {
		const user_id = ctx.req.session.user.user_id;

		return await queryUserSettingsById({ user_id });
	}
);
