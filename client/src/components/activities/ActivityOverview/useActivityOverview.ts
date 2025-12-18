import { byIdAsList } from "@shared/lib/map";
import { useQuery } from "@tanstack/react-query";
import { useQueryTags } from "@/lib/hooks/query/tags/useQueryTags";
import { trpc } from "@/lib/trpc";

export default function useActivityOverview() {
	const { data: activitiesData } = useQuery(
		trpc.activities.q.all.queryOptions()
	);
	const { data: tags } = useQueryTags();

	const isProbablySuspended = !activitiesData || !tags;

	if (isProbablySuspended) return { isProbablySuspended };

	const activities = byIdAsList(activitiesData);

	return {
		isProbablySuspended,
		activities,
		tags,
	};
}
