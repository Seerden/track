import { sqlConnection } from "@/db/init";
import type { Occurrence } from "@shared/lib/schemas/activity";
import type { ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";

export const queryOccurrencesByUser: QueryFunction<
	{ user_id: ID },
	Promise<Occurrence[]>
> = async ({ sql = sqlConnection, user_id }) => {
	const occurrences = sql<[Occurrence]>`
      SELECT * FROM occurrences
      WHERE user_id = ${user_id}
   `;

	return occurrences;
};

export const queryOccurrencesByRecurrence: QueryFunction<
	{
		user_id: ID;
		recurrence_id: ID;
	},
	Promise<Occurrence[]>
> = async ({ sql = sqlConnection, user_id, recurrence_id }) => {
	const occurrences = await sql<[Occurrence]>`
      SELECT * FROM occurrences
      WHERE recurrence_id = ${recurrence_id}
      AND user_id = ${user_id}
   `;

	return occurrences;
};
