import type { Activity } from "@shared/lib/schemas/activity";
import { z } from "@shared/lib/zod";
import { TABLES } from "types/tables";
import { query } from "@/lib/query-function";
import { queryActivityById } from "./query-activities";

/**
 * @todo for all other `query()` function input types, we define them outside of
 * the query file. Should probably do the same for this, or refactor everything
 * else to do what we do here (schema definition in same file as query). */
export const deleteActivityByIdInputSchema = z.object({
	activity_id: z.string(),
	/** used to verify ownership of the activity */
	user_id: z.string(),
});
export type DeleteActivityByIdInput = z.infer<
	typeof deleteActivityByIdInputSchema
>;

export const deleteActivityById = query(
	async (sql, { activity_id, user_id }: DeleteActivityByIdInput) => {
		const activity = await queryActivityById({ activity_id, user_id });
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
		// ^ activities_tags doesn't cascade on user_id delete, but that's OOS for
		// this

		return deletedActivity;
	}
);
