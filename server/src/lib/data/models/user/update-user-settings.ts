import {
	type UserSettings,
	type UserSettingsUpdateInput,
	userSettingsSchema,
} from "@shared/lib/schemas/settings";
import type { User } from "@shared/lib/schemas/user";
import { TABLES } from "types/tables";
import { createTransaction, query } from "@/lib/query-function";

/** For a user, update the given settings in the database with the given values.
 */
export const updateUserSettings = query(
	async ({
		input,
		user_id,
	}: {
		input: UserSettingsUpdateInput;
		user_id: User["user_id"];
	}) => {
		const validInput = Object.entries(input).reduce((acc, cur) => {
			const [key, val] = cur;

			if (val !== undefined) {
				acc = {
					...acc,
					[key]: val,
				};
			}

			return acc;
		}, {} as UserSettingsUpdateInput);

		if (!Object.keys(validInput).length) {
			return;
		}

		return await createTransaction(async (sql) => {
			const updatedSettings = await sql<[UserSettings?]>`
            update ${sql(TABLES.USER_SETTINGS)}
            set ${sql(validInput)}
            where user_id = ${user_id}
            returning *
      `;

			if (updatedSettings.length > 1) {
				// I think throwing the error implicitly makes the transaction call
				// rollback, but it's fine like this.
				await sql`rollback`;
				throw new Error(
					"updateUserSettings attempted to update more than 1 row."
				);
			}

			return userSettingsSchema.parse(updatedSettings[0]);
		});
	}
);
