import type { Occurrence } from "@shared/lib/schemas/activity";
import type { ID } from "@shared/types/data/utility.types";
import { query } from "@/lib/query-function";

// TODO: include the user_id in the QueryFunction type, because basically all
// query functions require it.
// TODO: I'm not sure what the use-case for this is. I guess it would be
// possible to re-adjust (an) already adjusted occurrence(s) to a different
// offset or something, but I don't know if that would ever actually happen.
export const updateOccurrence = query(
	async (
		sql,
		{ user_id, occurrence }: { occurrence: Occurrence } & { user_id: ID }
	) => {
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
	}
);
