import useActivitiesQuery from "@/lib/hooks/query/activities/useActivitiesQuery";
import useTagsQuery from "@/lib/hooks/query/tags/useTagsQuery";

export default function useActivityList() {
	const { data: activitiesData } = useActivitiesQuery();
	const { data: tagsData } = useTagsQuery();

	return {
		activitiesData,
		tagsData
	};
}
