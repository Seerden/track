import type { Occurrence } from "@shared/lib/schemas/activity";
import type { ID } from "@shared/types/data/utility.types";
import { query } from "@/lib/query-function";

export const queryOccurrencesByUser = query(
	async (sql, { user_id }: { user_id: ID }) => {
		return await sql<[Occurrence]>`
         SELECT * FROM occurrences
         WHERE user_id = ${user_id}
      `;
	}
);

export const queryOccurrencesByRecurrence = query(
	async (
		sql,
		{ user_id, recurrence_id }: { user_id: ID; recurrence_id: ID }
	) => {
		return await sql<[Occurrence]>`
         SELECT * FROM occurrences
         WHERE recurrence_id = ${recurrence_id}
         AND user_id = ${user_id}
      `;
	}
);
