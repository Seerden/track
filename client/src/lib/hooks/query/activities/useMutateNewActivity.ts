import activityService from "@/lib/fetch/activity-service";
import { mk } from "@/lib/query-keys";
import type { ActivityInput, ActivityWithIds } from "@t/data/activity.types";
import { useMutation } from "@tanstack/react-query";

export function useMutateNewActivity() {
	return useMutation<ActivityWithIds, unknown, ActivityInput>({
		async mutationFn(activityInput) {
			return activityService.post(activityInput);
		},
		mutationKey: mk.activities.new
	});
}