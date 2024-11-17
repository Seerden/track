import { createRequestConfig } from "@/lib/fetch/create-request-config";
import { makeAuthorizedUrl } from "@/lib/fetch/make-authorized-url";
import { queryClient } from "@/lib/query-client";
import type { ActivitiesData } from "@/types/data.types";
import type { ActivityUpdateInput, ActivityWithIds } from "@/types/server/activity.types";
import type { ById } from "@/types/server/utility.types";
import { useMutation } from "@tanstack/react-query";

async function putTaskCompletion(input: ActivityUpdateInput): Promise<ActivityWithIds> {
	const url = makeAuthorizedUrl(`/data/task/completion`);
	return (await fetch(url, createRequestConfig.put({ input }))).json();
}

/** Patches the activities cache with a single just-updated activity.
 * @note This function is used as the `onSuccess` callback for the `useMutation`
 * hook. Because it uses the `queryClient` from the `query-client.ts` file, it
 * cannot be used outside of a hook because it depends on the react-query context.
 */
function updateActivitiesCache(updatedActivity: ActivityWithIds) {
	queryClient.setQueryData<ActivitiesData>(["activities"], (old): ActivitiesData => {
		if (!old)
			// This should never happen, since how could we update an activity that doesn't exist?
			return {
				byId: {
					[updatedActivity.activity_id]: updatedActivity
				}
			} as { byId: ById<ActivityWithIds> };

		if (!updatedActivity) return old;

		return {
			byId: {
				...old.byId,
				[updatedActivity.activity_id]: updatedActivity
			} as ById<ActivityWithIds>
		};
	});
}

export default function useTaskCompletionMutation() {
	return useMutation<ActivityWithIds, unknown, ActivityUpdateInput>({
		async mutationFn(activity) {
			return putTaskCompletion(activity);
		},
		mutationKey: ["task-completion"],
		onSuccess: updateActivitiesCache
	});
}
