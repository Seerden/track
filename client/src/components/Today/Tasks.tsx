import useTagsQuery from "@lib/query/use-tags-query";
import { ActivityWithIds } from "@type/server/activity.types";
import Task from "./Task";
import * as S from "./Today.style";

type TasksProps = {
	activities: ActivityWithIds[];
};

export default function Tasks({ activities }: TasksProps) {
	const { data: tags } = useTagsQuery();

	return (
		<S.TasksWrapper>
			<S.BlockTitle>Tasks</S.BlockTitle>
			<S.Tasks>
				{activities.map((a) => (
					<Task key={a.activity_id} activity={a} tagsById={tags?.tagsById} />
				))}
			</S.Tasks>
		</S.TasksWrapper>
	);
}
