import { newTagSchema, tagSchema } from "@shared/lib/schemas/tag";
import { z } from "@shared/lib/zod";

export const tagInputSchema = z.object({
	newTag: newTagSchema,
	parent_id: z.string().optional(),
});
export type TagInput = z.infer<typeof tagInputSchema>;

export const tagUpdateInputSchema = z.object({
	tag: tagSchema,
	parent_id: z.string().optional(),
});
export type TagUpdateInput = z.infer<typeof tagUpdateInputSchema>;
