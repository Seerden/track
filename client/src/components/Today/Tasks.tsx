import Empty from "@/components/Today/Empty";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import Task from "./Task";
import T from "./style/Tasks.style";
import S from "./style/Today.style";

type TasksProps = {
	activities: PossiblySyntheticActivity[];
};

export default function Tasks({ activities }: TasksProps) {
	const { openModal } = useModalState();

	return (
		<T.TasksWrapper style={{ gridArea: "tasks" }}>
			<S.BlockTitle>Tasks</S.BlockTitle>
			{activities.length ? (
				<T.Tasks>
					{activities.map((a) => (
						<Task key={a.activity_id ?? a.synthetic_id} activity={a} />
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
