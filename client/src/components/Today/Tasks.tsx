import Empty from "@/components/Today/Empty";
import ActivityForm from "@/components/activities/ActivityForm/ActivityForm";
import Modal from "@/components/utility/Modal/Modal";
import { filterTagsById } from "@/lib/filter-tags";
import useTagsQuery from "@/lib/hooks/query/tags/useTagsQuery";
import modalIds from "@/lib/modal-ids";
import type { ActivityWithIds } from "@t/data/activity.types";
import Task from "./Task";
import T from "./style/Tasks.style";
import S from "./style/Today.style";

type TasksProps = {
	activities: ActivityWithIds[];
};

export default function Tasks({ activities }: TasksProps) {
	const { data: tags } = useTagsQuery();
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

			{/* TODO: see note from Notes.tsx on whether this modal should still be here. */}
			<Modal initialOpen={false} modalId={modalId}>
				<ActivityForm isTask modalId={modalId} />
			</Modal>
		</T.TasksWrapper>
	);
}
