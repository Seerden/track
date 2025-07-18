import {
	createTagTreeMap,
	getTagsWithRelations,
} from "@/lib/data/models/tags/merge-tags-and-relations";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";
import { transformByIdToMap } from "@shared/lib/map";

export const queryTags = authenticatedProcedure.query(async ({ ctx }) => {
	const tags = await getTagsWithRelations({ user_id: ctx.req.session.user.user_id });
	return transformByIdToMap({
		byId: tags,
	});
});

export const queryTagTree = authenticatedProcedure.query(async ({ ctx }) => {
	const tagsById = await getTagsWithRelations({ user_id: ctx.req.session.user.user_id });
	const map = createTagTreeMap(tagsById);
	return transformByIdToMap({
		byId: map,
	});
});
