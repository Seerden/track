import { useQuery } from "@tanstack/react-query";
import type { TagsData } from "@type/data.types";
import { makeAuthorizedUrl } from "../../fetch/make-authorized-url";
import { defaultQueryConfig, queryClient } from "../../query-client";

async function getTags() {
	const url = makeAuthorizedUrl("/data/tags");
	const response = await fetch(url, {
		credentials: "include",
		method: "GET"
	});

	// TODO: when tags are fetched, tree also -- maybe this means we should put
	// them into a single query
	queryClient.invalidateQueries({ queryKey: ["tags", "tree"] });
	return response.json();
}

export default function useTagsQuery() {
	return useQuery<TagsData>({
		// TODO: if someone switches accounts, they might get the wrong tags --
		// make sure to invalidate all user-data queries when the user changes, or
		// add user_id to the queryKey
		queryKey: ["tags"],
		queryFn: getTags,
		...defaultQueryConfig
	});
}
