import type {
	CreateRecurrenceInput,
	NewRecurrenceInput,
	Recurrence,
	RecurrenceWithIds,
} from "@shared/lib/schemas/activity";
import type { ID } from "@shared/types/data/utility.types";
import { updateActivityRecurrence } from "@/lib/data/models/activities/update-activity";
import { query, transaction } from "@/lib/query-function";

/** Insert a new recurrence row. */
const insertRecurrence = query(
	async (
		sql,
		{ user_id, ...newRecurrence }: NewRecurrenceInput & { user_id: ID }
	) => {
		const withUserId = { ...newRecurrence, user_id };

		const [recurrence] = await sql<[Recurrence]>`
      INSERT INTO recurrences ${sql(withUserId)}
      RETURNING *
   `;

		return recurrence;
	}
);

/** Insert a new recurrent row and assign its id to its progenitor activity. */
export const createRecurrence = query(
	async (
		sql,
		{
			user_id,
			activity_id,
			...newRecurrence
		}: CreateRecurrenceInput & { user_id: ID }
	) => {
		return await sql.begin(async (q) => {
			return transaction(q, async () => {
				const withUserId = { ...newRecurrence, user_id };

				const recurrence = await insertRecurrence({
					...withUserId,
				});

				const updatedActivity = await updateActivityRecurrence({
					activity_id,
					recurrence_id: recurrence.recurrence_id,
				});

				return {
					...recurrence,
					activity_id: updatedActivity.activity_id,
				} as RecurrenceWithIds;
			});
		});
	}
);
