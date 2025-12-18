import type {
	NewOccurrenceInput,
	Occurrence,
} from "@shared/lib/schemas/activity";
import type { ID } from "@shared/types/data/utility.types";
import { query } from "@/lib/query-function";

export const createOccurrence = query(
	async (
		sql,
		{ user_id, ...newOccurrence }: NewOccurrenceInput & { user_id: ID }
	) => {
		const withUserId = { ...newOccurrence, user_id };

		const [occurence] = await sql<[Occurrence]>`
      INSERT INTO occurrences ${sql(withUserId)}
      RETURNING *
   `;

		// TODO: for all non-synthetic activities that this occurence applies to, we
		// need to set the `occurrence` field. I'm debating whether an
		// `occurrence_id` field is better.

		return occurence;
	}
);
