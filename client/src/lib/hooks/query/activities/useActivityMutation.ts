import { createRequestConfig } from "@/lib/fetch/create-request-config";
import { makeAuthorizedUrl } from "@/lib/fetch/make-authorized-url";
import { mk } from "@/lib/query-keys";
import { activityGuards } from "@t/data/activity.guards";
import type { ActivityUpdateInput, ActivityWithIds } from "@t/data/activity.types";
import { hasValidUserId } from "@t/data/user-id.guards";
import { useMutation } from "@tanstack/react-query";

async function putActivity(input: ActivityUpdateInput): Promise<ActivityWithIds> {
	const url = makeAuthorizedUrl(`/data/activity/${input.activity.activity_id}`); // TODO: actually create this endpoint
	const updatedActivity = (await fetch(url, createRequestConfig.put({ input }))).json();

	return updatedActivity;
}

export default function useActivityMutation() {
	return useMutation<ActivityWithIds, unknown, ActivityUpdateInput>({
		async mutationFn(input) {
			return putActivity(input);
		},
		mutationKey: mk.activities.update.activity
	});
}

export function parseUpdatedActivity(activity: Partial<ActivityWithIds>) {
	// check if user_id is actually present, same for activity_id because we
	// can't update an activity without an id
	if (!hasValidUserId(activity) || !activity.activity_id || isNaN(activity.activity_id))
		throw new Error("Activity must have a valid user id and activity id");

	// extract the functionality from parseNewActivity that is also used here
	// into a separate function and call it here
	// TODO: this should just be guarded by properly testing DateTimePicker.
	if (!activityGuards.withDates(activity) && !activityGuards.withTimestamps(activity)) {
		throw new Error("Activity must have either date fields or timestamp fields");
	}

	return activity;
}
