import {
	type UserSettings,
	userSettingsSchema,
} from "@shared/lib/schemas/settings";
import type { User } from "@shared/lib/schemas/user";
import type { Maybe } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";
import { TABLES } from "types/tables";
import { sqlConnection } from "@/db/init";

/** Query the user settings for a given user. */
export const queryUserSettingsById: QueryFunction<
	{ user_id: User["user_id"] },
	Promise<Maybe<UserSettings>>
> = async ({ sql = sqlConnection, user_id }) => {
	const settings = await sql<[UserSettings?]>`
      select * from ${sql(TABLES.USER_SETTINGS)}
      where user_id = ${user_id}
   `;

	if (settings.length > 1) {
		throw new Error("queryUserSettingsById found more than 1 row.");
	}

	return userSettingsSchema.parse(settings[0]);
};
