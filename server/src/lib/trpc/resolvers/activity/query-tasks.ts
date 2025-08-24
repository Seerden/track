import { queryOverdueTasksByUser } from "@/lib/data/models/activities/query-tasks";
import { authenticatedProcedure } from "../../procedures/authenticated.procedure";

export const queryOverdueTasks = authenticatedProcedure.query(
	async ({ ctx }) => {
		const overdueTasks = await queryOverdueTasksByUser({
			user_id: ctx.req.session.user.user_id,
		});

		return overdueTasks;
	}
);
