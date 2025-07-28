import useMutateTaskCompletion from "@/lib/hooks/query/activities/useMutateTask";
import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import { useCallback } from "react";
import { isSyntheticActivity } from "../recurrence";

export default function usePutTaskCompletion(task: PossiblySyntheticActivity) {
	const { mutate } = useMutateTaskCompletion();

	const putCompletion = useCallback(() => {
		if (isSyntheticActivity(task)) {
			// TODO TRK-206: handle synthetic activity completion. I have some
			// notes about this somewhere. For a start, handling this requires
			// converting the synthetic activity into a real one somehow. All the
			// logic should probably be server-side.
		} else {
			mutate({ ...task, completed: !task.completed });
		}
	}, [task, mutate]);

	return putCompletion;
}
