import { queryActivitiesAndRelations } from "@/lib/data/models/activities/query-activities";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const queryActivities = authenticatedProcedure.query(async ({ ctx }) => {
	return await queryActivitiesAndRelations({ user_id: ctx.req.session.user.user_id });
});
