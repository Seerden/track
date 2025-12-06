import {
	deleteActivityById,
	deleteActivityByIdInputSchema,
} from "@/lib/data/models/activities/delete-activity";
import { betterAuthProcedure } from "../../procedures/authenticated.procedure";

export const resolveDeleteActivityById = betterAuthProcedure
	.input(deleteActivityByIdInputSchema.omit({ user_id: true }))
	.mutation(async ({ input, ctx }) => {
		return await deleteActivityById({
			activity_id: input.activity_id,
			user_id: ctx.user.id,
		});
	});
