import type {
	NewOccurrenceInput,
	Occurrence,
} from "@shared/lib/schemas/activity";
import type { ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";
import { sqlConnection } from "@/db/init";

export const insertOccurrence: QueryFunction<
	NewOccurrenceInput & { user_id: ID },
	Promise<Occurrence>
> = async ({ sql = sqlConnection, user_id, ...newOccurrence }) => {
	const withUserId = { ...newOccurrence, user_id };

	const [occurence] = await sql<[Occurrence]>`
      INSERT INTO occurrences ${sql(withUserId)}
      RETURNING *
   `;

	// TODO: for all non-synthetic activities that this occurence applies to, we
	// need to set the `occurrence` field. I'm debating whether an
	// `occurrence_id` field is better.

	return occurence;
};
