import type { Occurrence } from "@shared/lib/schemas/activity";
import type { ID } from "@shared/types/data/utility.types";
import { query } from "@/lib/query-function";

// TODO: business logic -- haven't designed the logic for this yet.
export const removeOccurrenceById = query(
	async (
		sql,
		{ occurrence_id, user_id }: { occurrence_id: ID; user_id: ID }
	) => {
		const [deleted] = await sql<[Pick<Occurrence, "occurrence_id">]>`
         DELETE FROM occurrences
         WHERE occurrence_id = ${occurrence_id}
         AND user_id = ${user_id}
         RETURNING occurrence_id
      `;

		return deleted;
	}
);
