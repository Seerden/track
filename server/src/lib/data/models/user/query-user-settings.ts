import {
	type UserSettings,
	userSettingsSchema,
} from "@shared/lib/schemas/settings";
import type { User } from "@shared/lib/schemas/user";
import { TABLES } from "types/tables";
import { query } from "@/lib/query-function";

/** Query the user settings for a given user. */
export const queryUserSettingsById = query(
	async (sql, { user_id }: { user_id: User["user_id"] }) => {
		const settings = await sql<[UserSettings?]>`
         select * from ${sql(TABLES.USER_SETTINGS)}
         where user_id = ${user_id}
      `;

		if (settings.length > 1) {
			throw new Error("queryUserSettingsById found more than 1 row.");
		}

		return userSettingsSchema.parse(settings[0]);
	}
);
