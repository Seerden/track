import api from "@/lib/fetch/api";
import { queryClient } from "@/lib/query-client";
import { mk, qk } from "@/lib/query-keys";
import type { ActivitiesData } from "@/types/data.types";
import type { ActivityWithIds, TaskUpdateInput } from "@t/data/activity.types";
import type { ById } from "@t/data/utility.types";
import { useMutation } from "@tanstack/react-query";

async function putTaskCompletion(input: TaskUpdateInput) {
	return api.put<TaskUpdateInput, ActivityWithIds>({
		url: `/data/task/completion`,
		body: input
	});
}

/** Patches the activities cache with a single just-updated activity.
 * @note This function is used as the `onSuccess` callback for the `useMutation`
 * hook. Because it uses the `queryClient` from the `query-client.ts` file, it
 * cannot be used outside of a hook because it depends on the react-query context.
 */
function updateActivitiesCache(updatedActivity: ActivityWithIds) {
	queryClient.setQueryData<ActivitiesData>(qk.activities.all, (old): ActivitiesData => {
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
	return useMutation<ActivityWithIds, unknown, TaskUpdateInput>({
		async mutationFn(activity) {
			return putTaskCompletion(activity);
		},
		mutationKey: mk.activities.update.task.completion,
		onSuccess: updateActivitiesCache
	});
}
