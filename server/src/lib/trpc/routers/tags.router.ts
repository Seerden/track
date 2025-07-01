import { createTag } from "@/lib/trpc/resolvers/tag/insert-tags";
import { queryTags, queryTagTree } from "@/lib/trpc/resolvers/tag/query-tags";
import { t } from "@/lib/trpc/trpc-context";

export const tagRouter = t.router({
	all: queryTags,
	tree: queryTagTree,
	create: createTag,
});
