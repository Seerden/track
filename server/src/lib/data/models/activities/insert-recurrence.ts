import { sqlConnection } from "@/db/init";
import { updateActivityRecurrence } from "@/lib/data/models/activities/update-activity";
import type { ActivityWithIds } from "@shared/types/data/activity.types";
import type {
	CreateRecurrenceInput,
	NewRecurrenceInput,
	Recurrence,
} from "@shared/types/data/recurrence.types";
import type { ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";

/** Insert a new recurrence row. */
const insertRecurrence: QueryFunction<
	NewRecurrenceInput & { user_id: ID },
	Promise<Recurrence>
> = async ({ sql = sqlConnection, newRecurrence, user_id }) => {
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
	Promise<{ recurrence: Recurrence } & Pick<ActivityWithIds, "activity_id">>
> = async ({ sql = sqlConnection, newRecurrence, user_id, activity_id }) => {
	return sql.begin(async (q) => {
		const withUserId = { ...newRecurrence, user_id };

		const recurrence = await insertRecurrence({
			sql: q,
			newRecurrence: withUserId,
			user_id,
		});

		const updatedActivity = await updateActivityRecurrence({
			sql: q,
			activity_id,
			recurrence_id: recurrence.recurrence_id,
		});

		return {
			recurrence,
			activity_id: updatedActivity.activity_id,
		};
	});
};
