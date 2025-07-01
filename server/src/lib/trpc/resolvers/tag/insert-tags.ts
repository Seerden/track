import { insertTagWithRelations } from "@/lib/data/models/tags/insert-tags";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";
import { tagInputSchema } from "@shared/lib/schemas/tag";

export const createTag = authenticatedProcedure
	.input(tagInputSchema)
	.mutation(async ({ input: { newTag, parent_id } }) => {
		return await insertTagWithRelations({ newTag, parent_id });
	});
