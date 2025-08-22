import {
	type PossiblySyntheticActivity,
	type SyntheticActivity,
	syntheticActivitySchema,
} from "@shared/lib/schemas/activity";
import { produce } from "immer";
import { useAtom, useSetAtom } from "jotai";
import { useCallback } from "react";
import useMutateTaskCompletion from "@/lib/hooks/query/activities/useMutateTask";
import { queryClient } from "../query-client";
import { isSyntheticActivity } from "../recurrence";
import { activeItemAtom } from "../state/active-item-state";
import { syntheticActivitiesAtom } from "../state/synthetic-activity-state";
import { trpc } from "../trpc";
import { useMutateNewSyntheticActivity } from "./query/activities/useMutateNewActivity";

/**
 * @deprecated this hook doesn't do anything more than useMutateTaskCompletion,
 * so just put the mutation
 */
export default function usePutTaskCompletion(task: PossiblySyntheticActivity) {
	const { mutate } = useMutateTaskCompletion();
	const { mutate: mutateSynthetic } = useMutateNewSyntheticActivity();
	const setSyntheticActivities = useSetAtom(syntheticActivitiesAtom);
	const [activeItem, setActiveItem] = useAtom(activeItemAtom);

	const putCompletion = useCallback(() => {
		if (isSyntheticActivity(task)) {
			mutateSynthetic(
				syntheticActivitySchema.parse({
					...task,
					completed: !task.completed,
					// TODO: we also do this on the server. Same note here as there:
					// once we start involving occurrences, this might have to
					// change.
					will_recur: false,
				} as SyntheticActivity),
				{
					onSuccess: (updatedTask) => {
						// filter out the synthetic activity that we just turned into a
						// real one
						setSyntheticActivities(
							produce((draft) => {
								const index = draft.findIndex(
									(synthetic) => synthetic.synthetic_id === task.synthetic_id
								);
								if (index !== -1) {
									draft.splice(index, 1);
								}
							})
						);

						// if the synthetic activity was opened as a modal, we need to
						// now open the modal for the real activity
						if (activeItem.activity.activeId === task.synthetic_id) {
							setActiveItem(
								produce((draft) => {
									draft.activity.activeId = updatedTask.activity_id;
								})
							);
						}

						queryClient.invalidateQueries({
							queryKey: trpc.activities.tasks.overdue.queryKey(),
						});
					},
				}
			);
		} else {
			mutate(
				{ ...task, completed: !task.completed },
				{
					onSuccess: () => {
						queryClient.invalidateQueries({
							queryKey: trpc.activities.tasks.overdue.queryKey(),
						});
					},
				}
			);
		}
	}, [task, mutate, mutateSynthetic]);

	return putCompletion;
}
