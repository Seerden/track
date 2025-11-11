import { userSettingsUpdateInputSchema } from "@shared/lib/schemas/settings";
import { updateUserSettings } from "@/lib/data/models/user/update-user-settings";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const updateUserSettingsResolver = authenticatedProcedure
	.input(userSettingsUpdateInputSchema)
	.mutation(async ({ input, ctx }) => {
		return await updateUserSettings({
			input,
			user_id: ctx.req.session.user.user_id,
		});
	});
