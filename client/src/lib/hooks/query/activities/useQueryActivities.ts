import activityService from "@/lib/fetch/activity-service";
import transformByIdToMap from "@/lib/hooks/query/select-map-by-id";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

export default function useQueryActivities() {
	return useQuery({
		queryKey: qk.activities.all,
		queryFn: activityService.getByUser,
		select(data) {
			return transformByIdToMap(data);
		},
		...defaultQueryConfig
	});
}
