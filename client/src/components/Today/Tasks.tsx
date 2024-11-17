import Empty from "@/components/Today/Empty";
import NewActivity from "@/components/activities/NewActivity/NewActivity";
import Modal from "@/components/utility/Modal/Modal";
import { filterTagsById } from "@/lib/filter-tags";
import modalIds from "@/lib/modal-ids";
import useTagsQuery from "@/lib/query/tags/useTagsQuery";
import { useModalState } from "@/lib/state/modal-state";
import type { ActivityWithIds } from "@type/server/activity.types";
import Task from "./Task";
import T from "./style/Tasks.style";
import S from "./style/Today.style";

type TasksProps = {
	activities: ActivityWithIds[];
};

export default function Tasks({ activities }: TasksProps) {
	const { data: tags } = useTagsQuery();
	const { openModal } = useModalState();
	const modalId = modalIds.activities.newTask;

	return (
		<T.TasksWrapper>
			<S.BlockTitle>Tasks</S.BlockTitle>
			{activities.length ? (
				<T.Tasks>
					{activities.map((a) => (
						<Task
							key={a.activity_id}
							activity={a}
							tags={filterTagsById(a.tag_ids, tags?.byId)}
						/>
					))}
				</T.Tasks>
			) : (
				<Empty>No tasks found for today.</Empty>
			)}
			<button
				type="button"
				onClick={(e) => {
					e.stopPropagation();
					openModal(modalId);
				}}
			>
				New task
			</button>

			<Modal initialOpen={false} modalId={modalId}>
				<NewActivity isTask modalId={modalId} />
			</Modal>
		</T.TasksWrapper>
	);
}
