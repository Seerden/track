import { tagSchema } from "@shared/lib/schemas/tag";
import { z } from "@shared/lib/zod";

export const tagUpdateInputSchema = z.object({
	tag: tagSchema,
	parent_id: z.string().optional(),
});
export type TagUpdateInput = z.infer<typeof tagUpdateInputSchema>;
