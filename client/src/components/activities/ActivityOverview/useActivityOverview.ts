import { trpc } from "@/lib/trpc";
import { byIdAsList } from "@shared/lib/map";
import { useQuery } from "@tanstack/react-query";

export default function useActivityOverview() {
	const { data: activitiesData } = useQuery(trpc.activities.all.queryOptions());
	const { data: tagsData } = useQuery(trpc.tags.all.queryOptions());

	const isProbablySuspended = !activitiesData || !tagsData;

	if (isProbablySuspended) return { isProbablySuspended };

	const activities = activitiesData
		? byIdAsList(new Map(Object.entries(activitiesData.byId)))
		: [];

	return {
		isProbablySuspended,
		activities,
		tagsData
	};
}
