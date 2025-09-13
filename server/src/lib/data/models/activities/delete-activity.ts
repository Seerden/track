import type { Activity } from "@shared/lib/schemas/activity";
import { z } from "@shared/lib/zod";
import type { Maybe } from "@trpc/server/unstable-core-do-not-import";
import type { QueryFunction } from "types/sql.types";
import { TABLES } from "types/tables";
import { sqlConnection } from "@/db/init";
import { queryActivityById } from "./query-activities";

export const deleteActivityByIdInputSchema = z.object({
	activity_id: z.string(),
	/** used to verify ownership of the activity */
	user_id: z.string(),
});
export type DeleteActivityByIdInput = z.infer<
	typeof deleteActivityByIdInputSchema
>;

export const deleteActivityById: QueryFunction<
	DeleteActivityByIdInput,
	Promise<Maybe<Activity>>
> = async ({ sql = sqlConnection, activity_id, user_id }) => {
	const activity = await queryActivityById({ sql, activity_id, user_id });
	if (!activity) {
		// activity either did not exist, or user does not own it
		return null;
	}

	const [deletedActivity] = await sql<[Activity?]>`
      delete from ${sql(TABLES.activities)}
      where activity_id = ${activity_id}
      returning *
   `;

	// TODO (TRK-268): are activities cached? if so, invalidate or update the
	// cache here
	// TODO: does everything cascade delete properly?

	return deletedActivity;
};
