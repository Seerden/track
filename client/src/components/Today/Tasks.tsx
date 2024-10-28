import useTagsQuery from "@lib/query/use-tags-query";
import type { ActivityWithIds } from "@type/server/activity.types";
import Task from "./Task";
import T from "./Tasks.style";
import S from "./Today.style";

type TasksProps = {
	activities: ActivityWithIds[];
};

export default function Tasks({ activities }: TasksProps) {
	const { data: tags } = useTagsQuery();

	return (
		<T.TasksWrapper>
			<S.BlockTitle>Tasks</S.BlockTitle>
			<T.Tasks>
				{activities.map((a) => (
					<Task key={a.activity_id} activity={a} tagsById={tags?.tagsById} />
				))}
			</T.Tasks>
		</T.TasksWrapper>
	);
}
