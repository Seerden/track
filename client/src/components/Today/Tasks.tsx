import Empty from "@/components/Today/Empty";
import { filterTagsById } from "@/lib/filter-tags";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import { trpc } from "@/lib/trpc";
import type { ActivityWithIds } from "@shared/lib/schemas/activity";
import { useQuery } from "@tanstack/react-query";
import Task from "./Task";
import T from "./style/Tasks.style";
import S from "./style/Today.style";

type TasksProps = {
	activities: ActivityWithIds[];
};

export default function Tasks({ activities }: TasksProps) {
	const { data: tagsData } = useQuery(trpc.tags.all.queryOptions());
	const { openModal } = useModalState();

	return (
		<T.TasksWrapper style={{ gridArea: "tasks" }}>
			<S.BlockTitle>Tasks</S.BlockTitle>
			{activities.length ? (
				<T.Tasks>
					{activities.map((a) => (
						<Task
							key={a.activity_id}
							activity={a}
							tags={filterTagsById(a.tag_ids, tagsData?.byId)}
						/>
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
