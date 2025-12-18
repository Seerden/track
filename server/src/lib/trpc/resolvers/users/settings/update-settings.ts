import { userSettingsUpdateInputSchema } from "@shared/lib/schemas/settings";
import { updateUserSettings } from "@/lib/data/models/user/update-user-settings";
import { betterAuthProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const updateUserSettingsMutation = betterAuthProcedure
	.input(userSettingsUpdateInputSchema)
	.mutation(async ({ input, ctx }) => {
		return await updateUserSettings({
			input,
			user_id: ctx.user.id,
		});
	});
