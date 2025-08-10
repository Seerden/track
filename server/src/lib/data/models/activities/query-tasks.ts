import { sqlConnection } from "@/db/init";
import day from "@shared/lib/day";
import type { ActivityWithIds } from "@shared/lib/schemas/activity";
import type { ById, ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";
import { queryActivitiesAndRelations } from "./query-activities";

export const queryOverdueTasksByUser: QueryFunction<
	{ user_id: ID },
	Promise<ById<ActivityWithIds>>
> = async ({ sql = sqlConnection, user_id }) => {
	const now = day();

	const overdueTasks = await queryActivitiesAndRelations({
		sql,
		user_id,
		tasks: true,
		to: now,
		completed: false,
	});

	return overdueTasks;
};
