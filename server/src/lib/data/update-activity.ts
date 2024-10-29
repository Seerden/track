import dayjs from "dayjs";
import { sqlConnection } from "src/db/init";
import { Activity, ActivityUpdateInput } from "types/data/activity.types";
import { WithSQL } from "types/sql.types";

export function updateActivityCompletion({
	sql = sqlConnection,
	input,
}: WithSQL<{ input: ActivityUpdateInput }>) {
	const start = input.completion_start
		? dayjs(input.completion_start).toISOString()
		: null;
	const end = input.completion_end ? dayjs(input.completion_end).toISOString() : null;
	// Writing the fields out manually is a bit verbose, but it's clearer than
	// manipulating and using ${input}
	return sql<[Activity]>`
      update activities 
      set completed = ${input.completed ?? null},
         completion_start = ${start},
         completion_end = ${end}
      where activity_id = ${input.activity_id}
      returning *
   `;
}
