import useActivitiesQuery from "@lib/query/use-activities-query";
import useTagsQuery from "@lib/query/use-tags-query";

export default function useActivityList() {
	const { data: activitiesData } = useActivitiesQuery();
	const { data: tagsData } = useTagsQuery();

	return {
		activitiesData,
		tagsData
	};
}
