import type {
	Recurrence,
	RecurrenceWithIds,
} from "@shared/lib/schemas/activity";
import type { ID } from "@shared/types/data/utility.types";
import { query } from "@/lib/query-function";

// TODO: include the user_id in the QueryFunction type, because basically all
// query functions require it.
export const updateRecurrence = query(
	async (
		sql,
		{ user_id, ...recurrence }: RecurrenceWithIds & { user_id: ID }
	) => {
		const { recurrence_id, created_at, ...toUpdate } = recurrence;

		const [updatedRecurrence] = await sql<[Recurrence?]>`
         UPDATE recurrences
         SET ${sql(toUpdate)}
         WHERE recurrence_id = ${recurrence_id}
         AND user_id = ${user_id}
      `;

		return updatedRecurrence;
	}
);
