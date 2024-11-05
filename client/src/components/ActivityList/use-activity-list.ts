import useActivitiesQuery from "@/lib/query/useActivitiesQuery";
import useTagsQuery from "@/lib/query/useTagsQuery";

export default function useActivityList() {
	const { data: activitiesData } = useActivitiesQuery();
	const { data: tagsData } = useTagsQuery();

	return {
		activitiesData,
		tagsData
	};
}
