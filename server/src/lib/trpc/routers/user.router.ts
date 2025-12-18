import { meQuery } from "@/lib/trpc/resolvers/me";
import { userSettingsQuery } from "@/lib/trpc/resolvers/user/settings/query-settings.resolver";
import { updateUserSettingsMutation } from "@/lib/trpc/resolvers/user/settings/update-settings.resolver";
import { t } from "@/lib/trpc/trpc-context";

export const usersRouter = t.router({
	me: meQuery,
	settings: {
		query: userSettingsQuery,
		update: updateUserSettingsMutation,
	},
});
