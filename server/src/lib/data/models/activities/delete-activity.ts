import type { Activity } from "@shared/lib/schemas/activity";
import type { Maybe } from "@trpc/server/unstable-core-do-not-import";
import type { QueryFunction } from "types/sql.types";
import { TABLES } from "types/tables";
import { sqlConnection } from "@/db/init";

export const deleteActivityById: QueryFunction<
	{ activity_id: string },
	Promise<Maybe<Activity>>
> = async ({ sql = sqlConnection, activity_id }) => {
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
