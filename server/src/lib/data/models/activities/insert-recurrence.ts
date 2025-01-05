import { sqlConnection } from "@/db/init";
import type { NewRecurrenceInput, Recurrence } from "@shared/types/data/recurrence.types";
import type { ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";

export const insertRecurrence: QueryFunction<
	NewRecurrenceInput & { user_id: ID },
	Promise<Recurrence>
> = async ({ sql = sqlConnection, newRecurrence, user_id }) => {
	const withUserId = { ...newRecurrence, user_id };

	const [recurrence] = await sql<[Recurrence]>`
      INSERT INTO recurrences ${sql(withUserId)}
      RETURNING *
   `;

	return recurrence;
};
