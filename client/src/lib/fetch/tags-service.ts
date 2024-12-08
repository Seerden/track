import api from "@/lib/fetch/api";
import { queryClient } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { TagsData, TagsTreeData } from "@/types/data.types";

const tagService = {
	getByUser: async () => {
		// TODO: when tags are fetched, tree needs to be fetched, too -- maybe this
		// means we should put them into a single query
		const response = api.get<TagsData>({ url: "/data/tags" });
		queryClient.invalidateQueries({ queryKey: qk.tags.tree });
		return response;
	},
	getTree: async () => api.get<TagsTreeData>({ url: "/data/tags/tree" })
};

export default tagService;
