import { tagInputSchema } from "@shared/lib/schemas/tag";
import { insertTagWithRelations } from "@/lib/data/models/tags/insert-tags";
import { betterAuthProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const createTag = betterAuthProcedure
	.input(tagInputSchema)
	.mutation(async ({ input: { newTag, parent_id } }) => {
		return await insertTagWithRelations({ newTag, parent_id });
	});
