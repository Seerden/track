import { queryClient } from "@/lib/query-client";
import type { ActivitiesData } from "@/lib/query/useActivitiesQuery";
import useTaskCompletionMutation from "@/lib/query/useTaskMutation";
import type { ActivityWithIds } from "@/types/server/activity.types";
import { useCallback } from "react";

export default function usePutTaskCompletion(task: ActivityWithIds) {
	const { mutate } = useTaskCompletionMutation();

	function updateActivitiesCache(updatedActivity: ActivityWithIds) {
		queryClient.setQueryData<ActivitiesData>(["activities"], (old): ActivitiesData => {
			if (!old)
				// This should never happen, since how could we update an activity that doesn't exist?
				return {
					byId: {
						[updatedActivity.activity_id]: updatedActivity
					}
				};

			if (!updatedActivity) return old;

			return {
				byId: {
					...old.byId,
					[updatedActivity.activity_id]: updatedActivity
				}
			};
		});
	}

	const putCompletion = useCallback(() => {
		mutate(
			{ input: { ...task, completed: !task.completed } },
			{
				onSuccess: updateActivitiesCache
			}
		);
	}, [task, mutate]);

	return putCompletion;
}
