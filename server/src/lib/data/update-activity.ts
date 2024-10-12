import { sqlConnection } from "src/db/init";
import { Activity, ActivityUpdateInput } from "types/data/activity.types";
import { WithSQL } from "types/sql.types";

export function updateActivityCompletion({
	sql = sqlConnection,
	input,
}: WithSQL<{ input: ActivityUpdateInput }>) {
	// Writing the fields out manually is a bit verbose, but it's clearer than
	// manipulating and using ${input}
	return sql<[Activity]>`
      update activities 
      set completed = ${input.completed ?? null},
         completion_start = ${input.completion_start ?? null},
         completion_end = ${input.completion_end ?? null}
      where activity_id = ${input.activity_id}
      returning *
   `;
}
