import { NewActivity } from "../../../types/data/activity.types";
import { WithSQL } from "../../../types/sql.types";
import { sqlConnection } from "../../db/init";

/** WIP */
export async function insertActivity({
	sql = sqlConnection,
	newActivity,
}: WithSQL<{ newActivity: NewActivity }>) {
	// Insert activity into database
	// Return the inserted activity

	return sql`
      insert into activities ${sql(newActivity)}
      returning *
   `;
}
