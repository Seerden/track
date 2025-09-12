import { z } from "@shared/lib/zod";
import { deleteActivityById } from "@/lib/data/models/activities/delete-activity";
import { authenticatedProcedure } from "../../procedures/authenticated.procedure";

// TODO: create a schema+type for the input, and use it in the inner function as well
export const resolveDeleteActivityById = authenticatedProcedure
	.input(
		z.object({
			activity_id: z.string(),
		})
	)
	.mutation(async ({ input, ctx }) => {
		// TODO: check if activity belongs to the user before deleting
		return await deleteActivityById({
			activity_id: input.activity_id,
		});
	});
