import useActivitiesQuery from "../../lib/use-activities-query";
import useTagsQuery from "../../lib/use-tags-query";

export default function useActivityList() {
	const { data: activitiesData } = useActivitiesQuery();
	const { data: tagsData } = useTagsQuery();

	return {
		activitiesData,
		tagsData,
	};
}
