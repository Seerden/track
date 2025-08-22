import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import { filterTagsById } from "@/lib/filter-tags";
import { useQueryTags } from "./useQueryTags";

export function useQueryTagsByActivity(activity: PossiblySyntheticActivity) {
	// TODO: use another query to get tags by activity. Don't forget that
	// synthetic tags will always use the tags from activity they are based on.
	const { data: tags } = useQueryTags();
	return filterTagsById(activity.tag_ids, tags);
}
