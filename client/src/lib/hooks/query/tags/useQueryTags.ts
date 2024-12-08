import tagService from "@/lib/fetch/tags-service";
import { qk } from "@/lib/query-keys";
import type { TagsData } from "@/types/data.types";
import { defaultQueryConfig } from "@lib/query-client";
import { useQuery } from "@tanstack/react-query";

export default function useQueryTags() {
	return useQuery<TagsData>({
		queryKey: qk.tags.all,
		queryFn: tagService.getByUser,
		...defaultQueryConfig
	});
}
