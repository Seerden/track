import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import Empty from "@/components/Today/Empty";
import {
	activityEnd,
	activityStart,
	sortActivitiesByTime,
} from "@/lib/activity";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import T from "./style/Tasks.style";
import S from "./style/Today.style";
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
		<T.TasksWrapper style={{ gridArea: "tasks" }}>
			<S.BlockTitle>Tasks</S.BlockTitle>
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
