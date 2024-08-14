import { useMutation } from "@tanstack/react-query";
import { baseUrl, postConfig } from "../../helpers/fetch/fetch-constants";
import { Activity, NewActivity } from "../../types/server/activity.types";

async function postNewActivity(newActivity: NewActivity): Promise<Activity> {
	const activity: Promise<Activity> = (
		await fetch(`${baseUrl}/data/activity`, {
			...postConfig,
			body: JSON.stringify({ newActivity }),
		})
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
