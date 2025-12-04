import type { Recurrence } from "@shared/lib/schemas/activity";
import type { ID } from "@shared/types/data/utility.types";
import { TABLES } from "types/tables";
import { query } from "@/lib/query-function";

// TODO: business logic
export const removeRecurrenceById = query(
	async (
		sql,
		{ recurrence_id, user_id }: { recurrence_id: ID; user_id: ID }
	) => {
		const [deleted] = await sql<[Pick<Recurrence, "recurrence_id">]>`
      DELETE FROM ${TABLES.RECURRENCES}
      WHERE recurrence_id = ${recurrence_id}
      AND user_id = ${user_id}
      RETURNING recurrence_id
   `;

		return deleted;
	}
);
