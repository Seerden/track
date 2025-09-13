import {
	deleteActivityById,
	deleteActivityByIdInputSchema,
} from "@/lib/data/models/activities/delete-activity";
import { authenticatedProcedure } from "../../procedures/authenticated.procedure";

export const resolveDeleteActivityById = authenticatedProcedure
	.input(deleteActivityByIdInputSchema)
	.mutation(async ({ input, ctx }) => {
		// TODO: check if activity belongs to the user before deleting
		return await deleteActivityById({
			activity_id: input.activity_id,
			user_id: ctx.req.session.user.user_id,
		});
	});
