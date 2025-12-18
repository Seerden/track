import { createTagMutation } from "@/lib/trpc/resolvers/tag/insert-tags";
import { tagsQuery, tagTreeQuery } from "@/lib/trpc/resolvers/tag/query-tags";
import { t } from "@/lib/trpc/trpc-context";

export const tagsRouter = t.router({
	all: tagsQuery,
	tree: tagTreeQuery,
	create: createTagMutation,
});
