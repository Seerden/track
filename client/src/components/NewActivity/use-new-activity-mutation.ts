import { useMutation } from "@tanstack/react-query";
import { createPostConfig } from "../../lib/fetch/create-post-config";
import { makeAuthorizedUrl } from "../../lib/fetch/make-authorized-url";
import { Activity, NewActivity } from "../../types/server/activity.types";

async function postNewActivity(newActivity: NewActivity): Promise<Activity> {
	const url = makeAuthorizedUrl("/data/activity");
	const activity: Promise<Activity> = (
		await fetch(url, createPostConfig({ newActivity }))
	).json();

	return activity;
}

export function useNewActivityMutation() {
	return useMutation<Activity, unknown, NewActivity>({
		async mutationFn(newActivity) {
			return postNewActivity(newActivity);
		},
		mutationKey: ["new-activity"],
	});
}
