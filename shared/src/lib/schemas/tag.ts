import { timestampSchema } from "@shared/lib/schemas/timestamp";
import { z } from "@shared/lib/zod";
import type { ByIdMap } from "@shared/types/data/utility.types";

export const newTagSchema = z.object({
	user_id: z.string(),
	name: z.string(),
	description: z.string().optional(),
});
export type NewTag = z.infer<typeof newTagSchema>;

export const tagInputSchema = z.object({
	newTag: newTagSchema,
	parent_id: z.string().optional(),
});
export type TagInput = z.infer<typeof tagInputSchema>;

export const tagSchema = newTagSchema.and(
	z.object({
		created_at: timestampSchema,
	})
);
export type Tag = z.infer<typeof tagSchema>;

export const tagWithIdSchema = tagSchema.and(
	z.object({
		tag_id: z.string(),
	})
);
export type TagWithId = z.infer<typeof tagWithIdSchema>;

export const tagWithIdsSchema = tagWithIdSchema.and(
	z.object({
		parent_id: z.string().nullable().or(z.undefined()),
		child_ids: z.array(z.string()).or(z.undefined()),
	})
);
export type TagWithIds = z.infer<typeof tagWithIdsSchema>;

export const tagInTreeSchema = tagWithIdsSchema.and(
	z.object({
		tree_root_id: z.string(),
		tree_depth: z.number().int().min(0),
	})
);
export type TagInTree = z.infer<typeof tagInTreeSchema>;
export type TagsInTree = ByIdMap<TagInTree>;

export type TagsTree = Map<TagWithIds["tag_id"], TagWithIds["tag_id"][]>;
