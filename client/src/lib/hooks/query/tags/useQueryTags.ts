import tagService from "@/lib/fetch/tags-service";
import { qk } from "@/lib/query-keys";
import { defaultQueryConfig } from "@lib/query-client";
import { useQuery } from "@tanstack/react-query";

export default function useQueryTags() {
	return useQuery({
		queryKey: qk.tags.all,
		queryFn: tagService.getByUser,
		...defaultQueryConfig
	});
}
