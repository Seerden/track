import { me } from "@/lib/trpc/resolvers/me";
import { queryUserSettingsResolver } from "@/lib/trpc/resolvers/user/settings/query-settings.resolver";
import { updateUserSettingsResolver } from "@/lib/trpc/resolvers/user/settings/update-settings.resolver";
import { t } from "@/lib/trpc/trpc-context";

export const userRouter = t.router({
	me,
	settings: {
		query: queryUserSettingsResolver,
		update: updateUserSettingsResolver,
	},
});
