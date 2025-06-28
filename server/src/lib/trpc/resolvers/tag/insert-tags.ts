import { insertTagWithRelations } from "@/lib/data/models/tags/insert-tags";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";
import { z } from "zod";

// NewTag
export const newTagSchema = z.object({
	user_id: z.string(),
	name: z.string(),
	description: z.string().optional(),
});

// TagInput
export const tagInputSchema = z.object({
	newTag: newTagSchema,
	parent_id: z.string().optional(),
});

export const createTag = authenticatedProcedure
	.input(tagInputSchema)
	.mutation(async ({ input: { newTag, parent_id } }) => {
		return await insertTagWithRelations({ newTag, parent_id });
	});
