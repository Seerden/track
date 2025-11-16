import day from "@shared/lib/day";
import type { ID } from "@shared/types/data/utility.types";
import { query } from "@/lib/query-function";
import { queryActivitiesAndRelations } from "./query-activities";

export const queryOverdueTasksByUser = query(
	async ({ user_id }: { user_id: ID }) => {
		const now = day();

		const overdueTasks = await queryActivitiesAndRelations({
			user_id,
			tasks: true,
			to: now,
			completed: false,
		});

		return overdueTasks;
	}
);
