import useActivitiesQuery from "@/lib/query/activities/useActivitiesQuery";
import useTagsQuery from "@/lib/query/tags/useTagsQuery";

export default function useActivityList() {
	const { data: activitiesData } = useActivitiesQuery();
	const { data: tagsData } = useTagsQuery();

	return {
		activitiesData,
		tagsData
	};
}
