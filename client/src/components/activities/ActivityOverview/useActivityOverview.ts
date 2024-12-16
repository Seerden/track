import useQueryActivities from "@/lib/hooks/query/activities/useQueryActivities";
import useQueryTags from "@/lib/hooks/query/tags/useQueryTags";
import type { ActivityWithIds } from "@t/data/activity.types";

export default function useActivityOverview() {
	const { data: activitiesData } = useQueryActivities();
	const { data: tagsData } = useQueryTags();

	const isProbablySuspended = !activitiesData || !tagsData;

	if (isProbablySuspended) return { isProbablySuspended };

	// TODO: figure out why casting is necessary -- I don't have any type error
	// sin the project and the types are fine, otherwise, but it interprets this
	// one as any[] if we don't cast it. The type of tags, in the line below, is
	// inferred properly though.
	const activities = Object.values(activitiesData.byId) as ActivityWithIds[];
	const tags = Object.values(tagsData.byId);

	return {
		isProbablySuspended,
		activities,
		tags
	};
}
