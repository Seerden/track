import useTaskCompletionMutation from "@/lib/query/useTaskMutation";
import type { ActivityWithIds } from "@/types/server/activity.types";
import { useCallback } from "react";

export default function usePutTaskCompletion(task: ActivityWithIds) {
	const { mutate } = useTaskCompletionMutation();

	const putCompletion = useCallback(() => {
		mutate({ ...task, completed: !task.completed });
	}, [task, mutate]);

	return putCompletion;
}
