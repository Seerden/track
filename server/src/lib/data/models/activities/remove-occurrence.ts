import { sqlConnection } from "@/db/init";
import type { Occurrence } from "@shared/types/data/recurrence.types";
import type { ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";

// TODO: business logic
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
