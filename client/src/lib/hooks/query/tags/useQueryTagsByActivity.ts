import { filterTagsById } from "@/lib/filter-tags";
import { trpc } from "@/lib/trpc";
import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import { useQuery } from "@tanstack/react-query";

export function useQueryTagsByActivity(activity: PossiblySyntheticActivity) {
	// TODO: use another query to get tags by activity. Don't forget that
	// synthetic tags will always use the tags from activity they are based on.
	const { data: tagsData } = useQuery(trpc.tags.all.queryOptions());
	return filterTagsById(activity.tag_ids, tagsData?.byId);
}
