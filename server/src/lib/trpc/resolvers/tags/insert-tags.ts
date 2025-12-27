import { tagInputSchema } from "@shared/lib/schemas/tag";
import { insertTagWithRelations } from "@/lib/data/models/tags/insert-tags";
import { betterAuthProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const createTagMutation = betterAuthProcedure
	.input(tagInputSchema)
	.mutation(async ({ input: { newTag, parent_id }, ctx: { user } }) => {
		return await insertTagWithRelations({
			newTag,
			parent_id,
			user_id: user.id,
		});
	});
