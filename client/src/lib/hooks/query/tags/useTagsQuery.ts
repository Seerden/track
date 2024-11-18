import qk from "@/lib/query-keys";
import { makeAuthorizedUrl } from "@lib/fetch/make-authorized-url";
import { defaultQueryConfig, queryClient } from "@lib/query-client";
import { useQuery } from "@tanstack/react-query";
import type { TagsData } from "@type/data.types";

async function getTags() {
	const url = makeAuthorizedUrl("/data/tags");
	const response = await fetch(url, {
		credentials: "include",
		method: "GET"
	});

	// TODO: when tags are fetched, tree also -- maybe this means we should put
	// them into a single query
	queryClient.invalidateQueries({ queryKey: qk.tags.tree });
	return response.json();
}

export default function useTagsQuery() {
	return useQuery<TagsData>({
		// TODO: if someone switches accounts, they might get the wrong tags --
		// make sure to invalidate all user-data queries when the user changes, or
		// add user_id to the queryKey
		queryKey: qk.tags.all,
		queryFn: getTags,
		...defaultQueryConfig
	});
}
