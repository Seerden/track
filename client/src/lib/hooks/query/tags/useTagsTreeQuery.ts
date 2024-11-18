import { qk } from "@/lib/query-keys";
import type { TagsTreeData } from "@/types/data.types";
import { makeAuthorizedUrl } from "@lib/fetch/make-authorized-url";
import { defaultQueryConfig } from "@lib/query-client";
import { useQuery } from "@tanstack/react-query";

export async function getTagsTree() {
	const url = makeAuthorizedUrl("/data/tags/tree");
	const response = await fetch(url, {
		credentials: "include",
		method: "GET"
	});
	return response.json();
}

export default function useTagsTreeQuery() {
	return useQuery<TagsTreeData>({
		// TODO: if someone switches accounts, they might get the wrong tags --
		// make sure to invalidate all user-data queries when the user changes, or
		// add user_id to the queryKey
		queryKey: qk.tags.tree,
		queryFn: getTagsTree,
		...defaultQueryConfig
	});
}
