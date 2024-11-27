import api from "@/lib/fetch/api";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { ActivitiesData } from "@/types/data.types";
import { useQuery } from "@tanstack/react-query";

async function getActivities() {
	return api.get<ActivitiesData>({ url: "/data/activities" });
}

export default function useActivitiesQuery() {
	return useQuery<ActivitiesData>({
		queryKey: qk.activities.all,
		queryFn: getActivities,
		...defaultQueryConfig
	});
}
