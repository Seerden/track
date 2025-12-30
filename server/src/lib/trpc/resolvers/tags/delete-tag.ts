import { z } from "@shared/lib/zod";
import { deleteTagById } from "@/lib/data/models/tags/delete-tag";
import { betterAuthProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const deleteTagMutation = betterAuthProcedure
	.input(
		z.object({
			tag_id: z.string(),
		})
	)
	.mutation(async ({ input: { tag_id }, ctx: { user } }) => {
		return await deleteTagById({ user_id: user.id, tag_id });
	});
