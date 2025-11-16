import type { Recurrence } from "@shared/lib/schemas/activity";
import type { ID } from "@shared/types/data/utility.types";
import { query } from "@/lib/query-function";

export const queryRecurrencesByUser = query(
	async (
		sql,
		{ user_id, recurrence_ids }: { user_id: ID; recurrence_ids?: ID[] }
	) => {
		const recurrenceIdSql = recurrence_ids?.length
			? sql`and recurrence_id = any(${recurrence_ids})`
			: sql``;

		return sql<Recurrence[]>`
         select * from recurrences
         where user_id = ${user_id}
         ${recurrenceIdSql}
      `;
	}
);

// TODO TRK-240: do we want to alter these query functions to return
// RecurrenceWithIds instead of Recurrence?

export const queryRecurrencesById = query(
	async (
		sql,
		{ user_id, recurrence_ids }: { user_id: ID; recurrence_ids: ID[] }
	) => {
		if (!recurrence_ids.length) return [];

		return sql<Recurrence[]>`
         select * from recurrences
         where user_id = ${user_id}
         and recurrence_id = any(${recurrence_ids})
      `;
	}
);

export const queryRecurrenceByActivity = query(
	async (
		sql,
		{
			activity_id,
			synthetic_id,
			user_id,
		}:
			| { activity_id: ID; user_id: ID; synthetic_id: null }
			| {
					activity_id: null;
					user_id: ID;
					synthetic_id: string;
			  }
	) => {
		// NOTE: synthetic ids are built like activity_id-recurrence_id-uuid
		// TODO: use a helper to create/extract these synthetic ids
		const activityId = activity_id ?? synthetic_id.split("-")[0];

		const [recurrence] = await sql<[Recurrence?]>`
         select r.* from recurrences r
         left join activities a
         on r.recurrence_id = a.recurrence_id and
            a.user_id = r.user_id
         where
            activity_id = ${activityId} and
            a.user_id = ${user_id} and
            a.recurrence_id is not null
      `;

		return recurrence ?? null;
	}
);
