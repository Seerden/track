import activityService from "@/lib/fetch/activity-service";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { ActivitiesData } from "@/types/data.types";
import { useQuery } from "@tanstack/react-query";

export default function useQueryActivities() {
	return useQuery<ActivitiesData>({
		queryKey: qk.activities.all,
		queryFn: activityService.getByUser,
		...defaultQueryConfig
	});
}
