import { queryOverdueTasksByUser } from "@/lib/data/models/activities/query-tasks";
import { transformByIdToMap } from "@shared/lib/map";
import { authenticatedProcedure } from "../../procedures/authenticated.procedure";

export const queryOverdueTasks = authenticatedProcedure.query(async ({ ctx }) => {
	const overdueTasks = await queryOverdueTasksByUser({
		user_id: ctx.req.session.user.user_id,
	});

	return transformByIdToMap({ byId: overdueTasks });
});
