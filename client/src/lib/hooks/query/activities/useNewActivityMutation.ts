import { createRequestConfig } from "@/lib/fetch/create-request-config";
import { mk } from "@/lib/query-keys";
import { makeAuthorizedUrl } from "@lib/fetch/make-authorized-url";
import { useMutation } from "@tanstack/react-query";
import type { ActivityInput, ActivityWithIds } from "@type/server/activity.types";

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
