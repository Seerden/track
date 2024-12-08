import tagService from "@/lib/fetch/tags-service";
import { qk } from "@/lib/query-keys";
import type { TagsTreeData } from "@/types/data.types";
import { defaultQueryConfig } from "@lib/query-client";
import { useQuery } from "@tanstack/react-query";

export default function useQueryTagsTree() {
	return useQuery<TagsTreeData>({
		queryKey: qk.tags.tree,
		queryFn: tagService.getTree,
		...defaultQueryConfig
	});
}
