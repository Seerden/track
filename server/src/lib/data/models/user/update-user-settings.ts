import {
	type UserSettings,
	type UserSettingsUpdateInput,
	userSettingsSchema,
} from "@shared/lib/schemas/settings";
import type { User } from "@shared/lib/schemas/user";
import type { Maybe } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";
import { TABLES } from "types/tables";
import { sqlConnection } from "@/db/init";

/** For a user, update the given settings in the database with the given values.
 */
export const updateUserSettings: QueryFunction<
	{ input: UserSettingsUpdateInput; user_id: User["user_id"] },
	Promise<Maybe<UserSettings>>
> = async ({ sql = sqlConnection, input, user_id }) => {
	const validInput = Object.entries(input).reduce((acc, cur) => {
		const [key, val] = cur;

		if (val !== undefined) {
			acc[key as keyof UserSettingsUpdateInput] = val;
		}

		return acc;
	}, {} as UserSettingsUpdateInput);

	if (!Object.keys(validInput).length) {
		return;
	}

	return await sql.begin(async (q) => {
		const updatedSettings = await q<[UserSettings?]>`
         update ${q(TABLES.USER_SETTINGS)}
         set ${q(validInput)}
         where user_id = ${user_id}
         returning *
      `;

		if (updatedSettings.length > 1) {
			// I think throwing the error implicitly makes the transaction call
			// rollback, but it's fine like this.
			await q`rollback`;
			throw new Error(
				"updateUserSettings attempted to update more than 1 row."
			);
		}

		return userSettingsSchema.parse(updatedSettings[0]);
	});
};
