import { createPostConfig } from "@lib/fetch/create-post-config";
import { makeAuthorizedUrl } from "@lib/fetch/make-authorized-url";
import { useMutation } from "@tanstack/react-query";
import { ActivityInput, ActivityWithIds } from "@type/server/activity.types";

async function postNewActivity({
	activity,
	tagIds,
}: ActivityInput): Promise<ActivityWithIds> {
	const url = makeAuthorizedUrl("/data/activity");
	const insertedActivity: Promise<ActivityWithIds> = (
		await fetch(url, createPostConfig({ activity, tagIds }))
	).json();

	return insertedActivity;
}

export function useNewActivityMutation() {
	return useMutation<ActivityWithIds, unknown, ActivityInput>({
		async mutationFn(activityInput) {
			return postNewActivity(activityInput);
		},
		mutationKey: ["new-activity"],
	});
}
