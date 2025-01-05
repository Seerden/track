import { sqlConnection } from "@/db/init";
import type { Occurrence, OccurrenceInput } from "@shared/types/data/recurrence.types";
import type { ID, Maybe } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";

// TODO: include the user_id in the QueryFunction type, because basically all
// query functions require it.
export const updateOccurrence: QueryFunction<
	OccurrenceInput & { user_id: ID },
	Promise<Maybe<Occurrence>>
> = async ({ sql = sqlConnection, user_id, occurrence }) => {
	const {
		activity_id,
		occurrence_id,
		recurrence_id,
		user_id: _user_id,
		...withoutIds
	} = occurrence;

	const [updatedOccurrence] = await sql<[Occurrence?]>`
      UPDATE occurrences
      SET ${sql(withoutIds)}
      WHERE occurrence_id = ${occurrence_id}
      AND user_id = ${user_id}
   `;

	return updatedOccurrence;
};
