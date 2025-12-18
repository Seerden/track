import {
	type PossiblySyntheticActivity,
	type SyntheticActivity,
	syntheticActivitySchema,
} from "@shared/lib/schemas/activity";
import { produce } from "immer";
import { useAtom } from "jotai";
import { useCallback } from "react";
import useMutateTaskCompletion from "@/lib/hooks/query/activities/useMutateTask";
import { activeItemAtom } from "@/lib/state/active-item-state";
import { queryClient } from "../query-client";
import { isSyntheticActivity } from "../recurrence";
import { trpc } from "../trpc";
import { useMutateNewSyntheticActivity } from "./query/activities/useMutateNewActivity";

export default function usePutTaskCompletion(task: PossiblySyntheticActivity) {
	const { mutate } = useMutateTaskCompletion();
	const { mutate: mutateSynthetic } = useMutateNewSyntheticActivity();
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
						// NOTE: it would seem like a good idea to filter out the
						// now-real synthetic activities from syntheticActivities, but
						// that's not the way the syntheticActivities atom works. It's
						// fine to have it always contain synthetics, even if it's
						// since been turned into a real activity. in useToday, we
						// filter out any duplicates that were formed this way. This
						// mutation invalidates all activity-related queries,
						// including the recurring activities query, and in
						// useQueryActivities(), we regenerated syntheticActivities
						// based on that query, so removing the synthetic activity in
						// this onSuccess handler only created a temporary layout
						// shift in the inbetween state.
						// if the synthetic activity was opened as a modal, we need to
						// now open the modal for the real activity
						if (activeItem.activity.activeId === task.synthetic_id) {
							setActiveItem(
								produce((draft) => {
									draft.activity.activeId = updatedTask.activity_id;
								})
							);
						}
					},
				}
			);
		} else {
			mutate(
				{ ...task, completed: !task.completed },
				{
					onSuccess: () => {
						queryClient.invalidateQueries({
							queryKey: trpc.activities.q.tasks.overdue.queryKey(),
						});
					},
				}
			);
		}
	}, [task, mutate, mutateSynthetic]);

	return putCompletion;
}
