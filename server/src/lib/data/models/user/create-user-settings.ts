import type { UserSettings } from "@shared/lib/schemas/settings";
import type { User } from "@shared/lib/schemas/user";
import type { Maybe } from "@trpc/server/unstable-core-do-not-import";
import type { QueryFunction } from "types/sql.types";
import { TABLES } from "types/tables";
import { sqlConnection } from "@/db/init";
import { queryUserSettingsById } from "@/lib/data/models/user/query-user-settings";

/** Insert a user settings row into the database for a given user id. */
export const createUserSettings: QueryFunction<
	{ user_id: string },
	Promise<Maybe<UserSettings>>
> = async ({ sql = sqlConnection, user_id }) => {
	const settings = await sql<[UserSettings?]>`
         insert into ${sql(TABLES.USER_SETTINGS)}
         ${sql({ user_id })}
         on conflict (user_id) do nothing
         returning *
      `;

	if (settings.length !== 1) {
		await sql`rollback`;
		throw new Error("Attempted to insert multiple rows of user settings.");
	}

	if (!settings[0]) {
		console.info(
			"createUserSettings was called, but no user was returned from the insert query."
		);
	}

	return settings[0];
};

/** Check if there is a user settings row for a given user_id. If not, create
 * it.
 * @note since `createUserSettings` does nothing on conflict, this isn't really
 * necessary, but the pattern is solid, so we should adhere to it. */
export const maybeCreateUserSettings: QueryFunction<
	{ user_id: User["user_id"] },
	Promise<Maybe<UserSettings>>
> = async ({ sql = sqlConnection, user_id }) => {
	return await sql.begin(async (q) => {
		const existingSettings = await queryUserSettingsById({ sql: q, user_id });

		if (existingSettings) {
			return existingSettings;
		}

		return await createUserSettings({ sql: q, user_id });
	});
};
