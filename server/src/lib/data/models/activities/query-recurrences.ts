import type { Recurrence } from "@shared/lib/schemas/activity";
import type { ID, Nullable } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";
import { sqlConnection } from "@/db/init";

export const queryRecurrencesByUser: QueryFunction<
	{ user_id: ID; recurrence_ids?: ID[] },
	Promise<Recurrence[]>
> = async ({ sql = sqlConnection, user_id, recurrence_ids }) => {
	const recurrenceIdSql = recurrence_ids?.length
		? sql`and recurrence_id = any(${recurrence_ids})`
		: sql``;

	return sql<Recurrence[]>`
      select * from recurrences
      where user_id = ${user_id}
      ${recurrenceIdSql}
   `;
};

// TODO TRK-240: do we want to alter these query functions to return
// RecurrenceWithIds instead of Recurrence?

export const queryRecurrencesById: QueryFunction<
	{ user_id: ID; recurrence_ids: ID[] },
	Promise<Recurrence[]>
> = async ({ sql = sqlConnection, user_id, recurrence_ids }) => {
	if (!recurrence_ids.length) return [];

	return sql<Recurrence[]>`
      select * from recurrences
      where user_id = ${user_id}
      and recurrence_id = any(${recurrence_ids})
   `;
};

export const queryRecurrenceByActivity: QueryFunction<
	| { activity_id: ID; user_id: ID; synthetic_id: null }
	| {
			activity_id: null;
			user_id: ID;
			synthetic_id: string;
	  },
	Promise<Nullable<Recurrence>>
> = async ({ sql = sqlConnection, activity_id, synthetic_id, user_id }) => {
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
};
