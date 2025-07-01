import { queryActivitiesAndRelations } from "@/lib/data/models/activities/query-activities";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";
import { transformByIdToMap } from "@shared/lib/map";

export const queryActivities = authenticatedProcedure.query(async ({ ctx }) => {
	const activities = await queryActivitiesAndRelations({
		user_id: ctx.req.session.user.user_id,
	});
	return transformByIdToMap({
		byId: activities,
	});
});
