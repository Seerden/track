import Empty from "@/components/Today/Empty";
import { filterTagsById } from "@/lib/filter-tags";
import useQueryTags from "@/lib/hooks/query/tags/useQueryTags";
import type { ActivityWithIds } from "@shared/types/data/activity.types";
import Task from "./Task";
import T from "./style/Tasks.style";
import S from "./style/Today.style";

type TasksProps = {
	activities: ActivityWithIds[];
};

export default function Tasks({ activities }: TasksProps) {
	const { data: tagsData } = useQueryTags();

	return (
		<T.TasksWrapper>
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
				<Empty>No tasks found for today.</Empty>
			)}
		</T.TasksWrapper>
	);
}
