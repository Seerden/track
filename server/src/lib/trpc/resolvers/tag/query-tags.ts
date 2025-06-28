import {
	createTagTreeMap,
	getTagsWithRelations,
} from "@/lib/data/models/tags/merge-tags-and-relations";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const queryTags = authenticatedProcedure.query(async ({ ctx }) => {
	return await getTagsWithRelations({ user_id: ctx.req.session.user.user_id });
});

export const queryTagTree = authenticatedProcedure.query(async ({ ctx }) => {
	const tagsById = await getTagsWithRelations({ user_id: ctx.req.session.user.user_id });
	return createTagTreeMap(tagsById);
});
