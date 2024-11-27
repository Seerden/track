import api from "@/lib/fetch/api";
import { qk } from "@/lib/query-keys";
import type { TagsData } from "@/types/data.types";
import { defaultQueryConfig, queryClient } from "@lib/query-client";
import { useQuery } from "@tanstack/react-query";

async function getTags() {
	// TODO: when tags are fetched, tree needs to be fetched, too -- maybe this
	// means we should put them into a single query
	const response = api.get<TagsData>({ url: "/data/tags" });
	queryClient.invalidateQueries({ queryKey: qk.tags.tree });
	return response;
}

export default function useTagsQuery() {
	return useQuery<TagsData>({
		queryKey: qk.tags.all,
		queryFn: getTags,
		...defaultQueryConfig
	});
}
