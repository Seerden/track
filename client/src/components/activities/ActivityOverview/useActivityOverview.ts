import useQueryActivities from "@/lib/hooks/query/activities/useQueryActivities";
import useQueryTags from "@/lib/hooks/query/tags/useQueryTags";

export default function useActivityOverview() {
	const { data: activitiesData } = useQueryActivities();
	const { data: tagsData } = useQueryTags();

	const isProbablySuspended = !activitiesData || !tagsData;

	if (isProbablySuspended) return { isProbablySuspended };

	const activities = Object.values(activitiesData.byId);
	const tags = Object.values(tagsData.byId);

	return {
		isProbablySuspended,
		activities,
		tags
	};
}
