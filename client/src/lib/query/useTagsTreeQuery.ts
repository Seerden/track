import type { TagsTreeData } from "@/types/data.types";
import { useQuery } from "@tanstack/react-query";
import { makeAuthorizedUrl } from "../fetch/make-authorized-url";
import { defaultQueryConfig } from "../query-client";

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
		queryKey: ["tags", "tree"],
		queryFn: getTagsTree,
		...defaultQueryConfig
	});
}
