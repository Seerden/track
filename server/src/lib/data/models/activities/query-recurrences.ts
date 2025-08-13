import { sqlConnection } from "@/db/init";
import type { Recurrence } from "@shared/lib/schemas/activity";
import type { ID, Nullable } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";

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
	/* if synthetic_id: find the original activity id that the synthetic is
	branched from */
	const activityId = activity_id ?? "1";

	const [recurrence] = await sql<[Recurrence?]>`
     SELECT r.* FROM recurrences r
     LEFT JOIN activities a
      ON r.recurrence_id = a.recurrence_id
      WHERE activity_id = ${activityId}
     AND a.user_id = ${user_id}
     AND r.user_id = ${user_id}
     AND a.recurrence_id IS NOT NULL
   `;

	return recurrence ?? null;
};
