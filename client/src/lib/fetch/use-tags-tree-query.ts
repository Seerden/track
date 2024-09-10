import { useQuery } from "@tanstack/react-query";
import type { Data } from "../../types/query.types";
import type { ById } from "../../types/server/utility.types";
import { defaultQueryConfig } from "../query-client";
import { makeAuthorizedUrl } from "./make-authorized-url";

export async function getTagsTree() {
	const url = makeAuthorizedUrl("/data/tags/tree");
	const response = await fetch(url, {
		credentials: "include",
		method: "GET",
	});
	return response.json();
}

type TagsTreeData = Data<"tree", ById<{ members: number[] }>>;

export default function useTagsTreeQuery() {
	return useQuery<TagsTreeData>({
		// TODO: if someone switches accounts, they might get the wrong tags --
		// make sure to invalidate all user-data queries when the user changes, or
		// add user_id to the queryKey
		queryKey: ["tags", "tree"],
		queryFn: getTagsTree,
		...defaultQueryConfig,
	});
}
