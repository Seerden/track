import activityService from "@/lib/fetch/activity-service";
import { mk } from "@/lib/query-keys";
import type {
	ActivityUpdateInput,
	ActivityWithIds
} from "@shared/types/data/activity.types";
import { useMutation } from "@tanstack/react-query";

export default function useActivityMutation() {
	return useMutation<ActivityWithIds, unknown, ActivityUpdateInput>({
		async mutationFn(input) {
			return activityService.put(input);
		},
		mutationKey: mk.activities.update.activity
	});
}
