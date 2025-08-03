import { queryOverdueTasksByUser } from "@/lib/data/models/activities/query-tasks";
import { authenticatedProcedure } from "../../procedures/authenticated.procedure";

export const queryOverdueTasks = authenticatedProcedure.query(async ({ ctx }) => {
	const user_id = ctx.req.session.user.user_id;

	return await queryOverdueTasksByUser({ user_id });
});
