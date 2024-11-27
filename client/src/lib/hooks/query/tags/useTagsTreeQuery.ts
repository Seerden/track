import api from "@/lib/fetch/api";
import { qk } from "@/lib/query-keys";
import type { TagsTreeData } from "@/types/data.types";
import { defaultQueryConfig } from "@lib/query-client";
import { useQuery } from "@tanstack/react-query";

export async function getTagsTree() {
	return api.get<TagsTreeData>({ url: "/data/tags/tree" });
}

export default function useTagsTreeQuery() {
	return useQuery<TagsTreeData>({
		queryKey: qk.tags.tree,
		queryFn: getTagsTree,
		...defaultQueryConfig
	});
}
