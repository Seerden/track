import api from "@/lib/fetch/api";
import { mk } from "@/lib/query-keys";
import type { ActivityInput, ActivityWithIds } from "@t/data/activity.types";
import { useMutation } from "@tanstack/react-query";

async function postNewActivity(input: ActivityInput): Promise<ActivityWithIds> {
	return api.post<ActivityInput, ActivityWithIds>({
		url: "/data/activity",
		body: input
	});
}

export function useNewActivityMutation() {
	return useMutation<ActivityWithIds, unknown, ActivityInput>({
		async mutationFn(activityInput) {
			return postNewActivity(activityInput);
		},
		mutationKey: mk.activities.new
	});
}
