import { sqlConnection } from "@/db/init";
import type { Activity, ActivityUpdateInput } from "@t/data//activity.types";
import dayjs from "dayjs";
import type { WithSQL } from "types/sql.types";

export async function updateActivityCompletion({
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
