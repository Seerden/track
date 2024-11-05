import { useDetailedActivityModal } from "@/components/Today/hooks/useDetailedActivityModal";
import usePutTaskCompletion from "@/lib/hooks/usePutTaskCompletion";
import { Checkbox } from "@/lib/theme/components/Checkbox";
import { activityEnd, activityStart } from "@lib/activity";
import type { ActivityWithIds } from "@type/server/activity.types";
import type { TagWithIds } from "@type/server/tag.types";
import { useRef } from "react";
import TagCard from "../TagCard/TagCard";
import T from "./style/Tasks.style";
import S from "./style/Today.style";

function useTask(activity: ActivityWithIds) {
	const checkboxRef = useRef<HTMLLabelElement>(null);
	const putCompletion = usePutTaskCompletion(activity);
	const { openDetailedActivityModal } = useDetailedActivityModal(activity);

	return {
		checkboxRef,
		openDetailedActivityModal,
		putCompletion
	} as const;
}

type TaskProps = {
	activity: ActivityWithIds;
	tags?: TagWithIds[];
};

export default function Task({ activity, tags = [] }: TaskProps) {
	const { checkboxRef, openDetailedActivityModal, putCompletion } = useTask(activity);

	return (
		<T.Task
			onClick={(e) => {
				e.stopPropagation();
				openDetailedActivityModal();
			}}
		>
			<S.CheckboxWrapper
				ref={checkboxRef}
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					putCompletion();
				}}
			>
				<S.Checkbox
					type="checkbox"
					style={{ display: "none" }}
					checked={activity.completed}
					onChange={() => undefined} // TODO: this is just to prevent a warning
				/>
				<Checkbox checked={activity.completed} />
			</S.CheckboxWrapper>
			<T.Times>
				<span>from {activityStart(activity).format("HH:mm")}</span>
				<span>to {activityEnd(activity).format("HH:mm")}</span>
			</T.Times>
			<T.TaskName>{activity.name}</T.TaskName>
			{!!tags.length && ( // TODO: make sure the styling of the component doesn't do anything weird when Tags isn't rendered
				<S.Tags>
					{tags.map((tag) => (
						<TagCard key={tag.tag_id} tag={tag} />
					))}
				</S.Tags>
			)}
		</T.Task>
	);
}
