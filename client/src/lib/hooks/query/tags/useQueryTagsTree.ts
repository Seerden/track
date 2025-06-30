import tagService from "@/lib/fetch/tags-service";
import { qk } from "@/lib/query-keys";
import { defaultQueryConfig } from "@lib/query-client";
import { useQuery } from "@tanstack/react-query";

export default function useQueryTagsTree() {
	return useQuery({
		queryKey: qk.tags.tree,
		queryFn: tagService.getTree,
		...defaultQueryConfig
	});
}
