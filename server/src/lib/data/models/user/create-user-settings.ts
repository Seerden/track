import type { UserSettings } from "@shared/lib/schemas/settings";
import type { User } from "@shared/lib/schemas/user";
import { TABLES } from "types/tables";
import { queryUserSettingsById } from "@/lib/data/models/user/query-user-settings";
import { createTransaction, query } from "@/lib/query-function";

/** Insert a user settings row into the database for a given user id. */
export const createUserSettings = query(
	async (sql, { user_id }: { user_id: string }) => {
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
	}
);

/** Check if there is a user settings row for a given user_id. If not, create
 * it.
 * @note since `createUserSettings` does nothing on conflict, this isn't really
 * necessary, but the pattern is solid, so we should adhere to it. */
export const maybeCreateUserSettings = query(
	async ({ user_id }: { user_id: User["user_id"] }) => {
		return await createTransaction(async () => {
			const existingSettings = await queryUserSettingsById({ user_id });

			if (existingSettings) {
				return existingSettings;
			}

			return await createUserSettings({ user_id });
		});
	}
);
