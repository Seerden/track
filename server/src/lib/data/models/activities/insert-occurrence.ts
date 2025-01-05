import { sqlConnection } from "@/db/init";
import type { NewOccurrenceInput, Occurrence } from "@shared/types/data/recurrence.types";
import type { ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";

export const insertOccurrence: QueryFunction<
	NewOccurrenceInput & { user_id: ID },
	Promise<Occurrence>
> = async ({ sql = sqlConnection, newOccurrence, user_id }) => {
	const withUserId = { ...newOccurrence, user_id };

	const [occurence] = await sql<[Occurrence]>`
      INSERT INTO occurrences ${sql(withUserId)}
      RETURNING *
   `;

	return occurence;
};
