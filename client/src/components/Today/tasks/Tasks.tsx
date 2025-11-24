import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import Empty from "@/components/Today/Empty";
import {
	activityEnd,
	activityStart,
	sortActivitiesByTime,
} from "@/lib/activity";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import Today from "../style/Today.style";
import T from "./style/Tasks.style";
import Task from "./Task";

type TasksProps = {
	activities: PossiblySyntheticActivity[];
};

function getActivityKey(activity: PossiblySyntheticActivity) {
	return `
      ${activityStart(activity).valueOf()}-${activityEnd(activity).valueOf()}-${activity.name}
   `;
}

export default function Tasks({ activities }: TasksProps) {
	const { openModal } = useModalState();

	const sortedActivities = sortActivitiesByTime(activities);

	return (
		<T.TasksWrapper>
			<Today.BlockTitle>Tasks</Today.BlockTitle>
			{activities.length ? (
				<T.Tasks>
					{sortedActivities.map((a) => (
						<Task key={getActivityKey(a)} activity={a} />
					))}
				</T.Tasks>
			) : (
				<Empty action={() => openModal(modalIds.activities.newTask)}>
					No tasks found for today.
				</Empty>
			)}
		</T.TasksWrapper>
	);
}
