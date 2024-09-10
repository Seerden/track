import { useMutation } from "@tanstack/react-query";
import { createPostConfig } from "../../lib/fetch/create-post-config";
import { baseUrl } from "../../lib/fetch/fetch-constants";
import { Activity, NewActivity } from "../../types/server/activity.types";

async function postNewActivity(newActivity: NewActivity): Promise<Activity> {
	const activity: Promise<Activity> = (
		await fetch(`${baseUrl}/data/activity`, createPostConfig({ newActivity }))
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
