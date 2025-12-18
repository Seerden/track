import { queryOverdueTasksByUser } from "@/lib/data/models/activities/query-tasks";
import { betterAuthProcedure } from "../../procedures/authenticated.procedure";

export const overdueTasksQuery = betterAuthProcedure.query(async ({ ctx }) => {
	const overdueTasks = await queryOverdueTasksByUser({
		user_id: ctx.user.id,
	});

	return overdueTasks;
});
