import { filterTagsById } from "@/lib/filter-tags";
import useTagsQuery from "@lib/query/use-tags-query";
import type { ActivityWithIds } from "@type/server/activity.types";
import Task from "./Task";
import T from "./style/Tasks.style";
import S from "./style/Today.style";

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
					<Task
						key={a.activity_id}
						activity={a}
						tags={filterTagsById(a.tag_ids, tags?.tagsById)}
					/>
				))}
			</T.Tasks>
		</T.TasksWrapper>
	);
}
