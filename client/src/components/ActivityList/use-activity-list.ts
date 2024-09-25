import useActivitiesQuery from "../../lib/use-activities-query";

export default function useActivityList() {
	const { data: activities } = useActivitiesQuery();

	return {
		activities,
	};
}
