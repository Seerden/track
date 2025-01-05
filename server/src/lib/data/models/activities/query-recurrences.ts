import { sqlConnection } from "@/db/init";
import type { Recurrence } from "@shared/types/data/recurrence.types";
import type { ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";

export const queryRecurrencesByUser: QueryFunction<
	{ user_id: ID },
	Promise<Recurrence[]>
> = async ({ sql = sqlConnection, user_id }) => {
	return sql<Recurrence[]>`
      SELECT * FROM recurrences
      WHERE user_id = ${user_id}
   `;
};

export const queryRecurrenceByActivity: QueryFunction<
	{ activity_id: ID; user_id: ID },
	Promise<Recurrence[]>
> = async ({ sql = sqlConnection, activity_id, user_id }) => {
	return sql<Recurrence[]>`
      SELECT * FROM recurrences
      WHERE activity_id = ${activity_id}
      AND user_id = ${user_id}
   `;
};
