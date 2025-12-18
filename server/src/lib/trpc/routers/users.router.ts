import { meQuery } from "@/lib/trpc/resolvers/users/me";
import { userSettingsQuery } from "@/lib/trpc/resolvers/users/settings/query-settings.resolver";
import { updateUserSettingsMutation } from "@/lib/trpc/resolvers/users/settings/update-settings.resolver";
import { t } from "@/lib/trpc/trpc-context";

export const usersRouter = t.router({
	me: meQuery,
	settings: {
		query: userSettingsQuery,
		update: updateUserSettingsMutation,
	},
});
