import { createRequestConfig } from "@/lib/fetch/create-request-config";
import { mk } from "@/lib/query-keys";
import { makeAuthorizedUrl } from "@lib/fetch/make-authorized-url";
import type { ActivityInput, ActivityWithIds } from "@t/data/activity.types";
import { useMutation } from "@tanstack/react-query";

async function postNewActivity({
	activity,
	tagIds
}: ActivityInput): Promise<ActivityWithIds> {
	const url = makeAuthorizedUrl("/data/activity");
	const insertedActivity: Promise<ActivityWithIds> = (
		await fetch(url, createRequestConfig.post({ activity, tagIds }))
	).json();

	return insertedActivity;
}

export function useNewActivityMutation() {
	return useMutation<ActivityWithIds, unknown, ActivityInput>({
		async mutationFn(activityInput) {
			return postNewActivity(activityInput);
		},
		mutationKey: mk.activities.new
	});
}
