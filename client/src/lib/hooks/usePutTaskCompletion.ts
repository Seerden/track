import useMutateTaskCompletion from "@/lib/hooks/query/activities/useMutateTask";
import type { ActivityWithIds } from "@shared/lib/schemas/activity";
import { useCallback } from "react";

export default function usePutTaskCompletion(task: ActivityWithIds) {
	const { mutate } = useMutateTaskCompletion();

	const putCompletion = useCallback(() => {
		mutate({ ...task, completed: !task.completed });
	}, [task, mutate]);

	return putCompletion;
}
