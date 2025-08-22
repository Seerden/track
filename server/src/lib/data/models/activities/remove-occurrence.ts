import type { Occurrence } from "@shared/lib/schemas/activity";
import type { ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";
import { sqlConnection } from "@/db/init";

// TODO: business logic -- haven't designed the logic for this yet.
export const removeOccurrenceById: QueryFunction<
	{
		occurrence_id: ID;
		user_id: ID;
	},
	Promise<Pick<Occurrence, "occurrence_id">>
> = async ({ sql = sqlConnection, occurrence_id, user_id }) => {
	const [deleted] = await sql<[Pick<Occurrence, "occurrence_id">]>`
      DELETE FROM occurrences
      WHERE occurrence_id = ${occurrence_id}
      AND user_id = ${user_id}
      RETURNING occurrence_id
   `;

	return deleted;
};
