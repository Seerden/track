import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import { AnimatePresence, motion } from "motion/react";
import BlockHeader from "@/components/Today/BlockHeader";
import Empty from "@/components/Today/Empty";
import Today, {
	filterableContainer,
} from "@/components/Today/style/Today.style";
import { getActivityKey } from "@/components/Today/tasks/get-activity-key";
import { useTasks } from "@/components/Today/tasks/useTasks";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import S from "./style/Tasks.style";
import Task from "./Task";

export default function Tasks({
	activities,
}: {
	activities: PossiblySyntheticActivity[];
}) {
	const { opened, filteredActivities, headerProps } = useTasks(activities);
	const { openModal } = useModalState();

	return (
		<S.TasksWrapper>
			<BlockHeader {...headerProps} />

			{activities.length > 0 ? (
				<motion.div {...filterableContainer(opened)}>
					<Today.Section>
						<AnimatePresence>
							{filteredActivities.map((a) => (
								<Task key={getActivityKey(a)} activity={a} />
							))}
						</AnimatePresence>
					</Today.Section>
				</motion.div>
			) : (
				<Empty action={() => openModal(modalIds.activities.newTask)}>
					No tasks found for today.
				</Empty>
			)}
		</S.TasksWrapper>
	);
}
