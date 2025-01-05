import { sqlConnection } from "@/db/init";
import type { Recurrence } from "@shared/types/data/recurrence.types";
import type { ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";

// TODO: business logic
export const removeRecurrenceById: QueryFunction<
	{
		recurrence_id: ID;
		user_id: ID;
	},
	Promise<Pick<Recurrence, "recurrence_id">>
> = async ({ sql = sqlConnection, recurrence_id, user_id }) => {
	const [deleted] = await sql<[Pick<Recurrence, "recurrence_id">]>`
      DELETE FROM recurrences
      WHERE recurrence_id = ${recurrence_id}
      AND user_id = ${user_id}
      RETURNING recurrence_id
   `;

	return deleted;
};
