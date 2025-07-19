import { sqlConnection } from "@/db/init";
import { updateActivityRecurrence } from "@/lib/data/models/activities/update-activity";
import type {
	CreateRecurrenceInput,
	NewRecurrenceInput,
	Recurrence,
	RecurrenceWithIds,
} from "@shared/lib/schemas/activity";
import type { ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";

/** Insert a new recurrence row. */
const insertRecurrence: QueryFunction<
	NewRecurrenceInput & { user_id: ID },
	Promise<Recurrence>
> = async ({ sql = sqlConnection, user_id, ...newRecurrence }) => {
	const withUserId = { ...newRecurrence, user_id };

	const [recurrence] = await sql<[Recurrence]>`
      INSERT INTO recurrences ${sql(withUserId)}
      RETURNING *
   `;

	return recurrence;
};

/** Insert a new recurrent row and assign its id to its progenitor activity. */
export const createRecurrence: QueryFunction<
	CreateRecurrenceInput & { user_id: ID },
	Promise<RecurrenceWithIds>
> = async ({ sql = sqlConnection, user_id, activity_id, ...newRecurrence }) => {
	return sql.begin(async (q) => {
		const withUserId = { ...newRecurrence, user_id };

		const recurrence = await insertRecurrence({
			sql: q,
			...withUserId,
		});

		const updatedActivity = await updateActivityRecurrence({
			sql: q,
			activity_id,
			recurrence_id: recurrence.recurrence_id,
		});

		return {
			...recurrence,
			activity_id: updatedActivity.activity_id,
		} as RecurrenceWithIds;
	});
};
