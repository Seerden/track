import { createTagMutation } from "@/lib/trpc/resolvers/tags/insert-tags";
import { tagsQuery, tagTreeQuery } from "@/lib/trpc/resolvers/tags/query-tags";
import { t } from "@/lib/trpc/trpc-context";

export const tagsRouter = t.router({
	q: {
		all: tagsQuery,
		tree: tagTreeQuery,
	},
	m: {
		create: createTagMutation,
	},
});
