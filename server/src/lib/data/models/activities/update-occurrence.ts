import { sqlConnection } from "@/db/init";
import type { Occurrence } from "@shared/lib/schemas/activity";
import type { ID, Maybe } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";

// TODO: include the user_id in the QueryFunction type, because basically all
// query functions require it.
// TODO: I'm not sure what the use-case for this is. I guess it would be
// possible to re-adjust (an) already adjusted occurrence(s) to a different
// offset or something, but I don't know if that would ever actually happen.
export const updateOccurrence: QueryFunction<
	{ occurrence: Occurrence } & { user_id: ID },
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
