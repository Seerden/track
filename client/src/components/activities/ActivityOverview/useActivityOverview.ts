import useQueryActivities from "@/lib/hooks/query/activities/useQueryActivities";
import { byIdAsList } from "@/lib/hooks/query/select-map-by-id";
import useQueryTags from "@/lib/hooks/query/tags/useQueryTags";

export default function useActivityOverview() {
	const { data: activitiesData } = useQueryActivities();
	const { data: tagsData } = useQueryTags();

	const isProbablySuspended = !activitiesData || !tagsData;

	if (isProbablySuspended) return { isProbablySuspended };

	const activities = byIdAsList(activitiesData.byId);
	const tags = byIdAsList(tagsData.byId);

	return {
		isProbablySuspended,
		activities,
		tags
	};
}
