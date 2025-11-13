import { queryUserSettingsResolver } from "@/lib/trpc/resolvers/user/settings/query-settings.resolver";
import { updateUserSettingsResolver } from "@/lib/trpc/resolvers/user/settings/update-settings.resolver";
import { t } from "@/lib/trpc/trpc-context";

export const userRouter = t.router({
	settings: {
		query: queryUserSettingsResolver,
		update: updateUserSettingsResolver,
	},
});
