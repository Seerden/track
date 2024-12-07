import { putActivity } from "@/lib/fetch/activity-service";
import { mk } from "@/lib/query-keys";
import type { ActivityUpdateInput, ActivityWithIds } from "@t/data/activity.types";
import { useMutation } from "@tanstack/react-query";

export default function useActivityMutation() {
	return useMutation<ActivityWithIds, unknown, ActivityUpdateInput>({
		async mutationFn(input) {
			return putActivity(input);
		},
		mutationKey: mk.activities.update.activity
	});
}
