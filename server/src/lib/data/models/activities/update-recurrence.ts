import { sqlConnection } from "@/db/init";
import type { Recurrence, RecurrenceWithIds } from "@shared/lib/schemas/activity";
import type { ID, Maybe } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";

// TODO: include the user_id in the QueryFunction type, because basically all
// query functions require it.
export const updateRecurrence: QueryFunction<
	RecurrenceWithIds & { user_id: ID },
	Promise<Maybe<Recurrence>>
> = async ({ sql = sqlConnection, user_id, ...recurrence }) => {
	const { recurrence_id, created_at, ...toUpdate } = recurrence;

	const [updatedRecurrence] = await sql<[Recurrence?]>`
      UPDATE recurrences
      SET ${sql(toUpdate)}
      WHERE recurrence_id = ${recurrence_id}
      AND user_id = ${user_id}
   `;

	return updatedRecurrence;
};
