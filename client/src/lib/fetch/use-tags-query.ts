import { useQuery } from "@tanstack/react-query";
import type { Data } from "../../types/query.types";
import type { TagWithIds } from "../../types/server/tag.types";
import type { ID } from "../../types/server/utility.types";
import { defaultQueryConfig } from "../query-client";
import { makeAuthorizedUrl } from "./make-authorized-url";

export async function getTags() {
	const url = makeAuthorizedUrl("/data/tags");
	const response = await fetch(url, {
		credentials: "include",
		method: "GET",
	});
	return response.json();
}

type TagsData = Data<"tagsById", Record<ID, TagWithIds>>;

export default function useTagsQuery() {
	return useQuery<TagsData>({
		// TODO: if someone switches accounts, they might get the wrong tags --
		// make sure to invalidate all user-data queries when the user changes, or
		// add user_id to the queryKey
		queryKey: ["tags"],
		queryFn: getTags,
		...defaultQueryConfig,
	});
}
