import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import { formatToHHmm } from "@/lib/datetime/format-date";
import useDetailedItemModal from "@/lib/hooks/useDetailedItemModal";
import usePutTaskCompletion from "@/lib/hooks/usePutTaskCompletion";
import modalIds from "@/lib/modal-ids";
import { activityEnd, activityStart } from "@lib/activity";
import type { ActivityWithIds } from "@shared/types/data/activity.types";
import type { TagWithIds } from "@shared/types/data/tag.types";
import { useRef } from "react";
import TagCard from "../tags/TagCard/TagCard";
import T from "./style/Tasks.style";
import S from "./style/Today.style";

function useTask(activity: ActivityWithIds) {
	const checkboxRef = useRef<HTMLLabelElement>(null);
	const putCompletion = usePutTaskCompletion(activity);
	const { openDetailedItemModal } = useDetailedItemModal(
		"activity",
		modalIds.detailedActivity
	);

	return {
		checkboxRef,
		openDetailedItemModal,
		putCompletion
	} as const;
}

type TaskProps = {
	activity: ActivityWithIds;
	tags?: TagWithIds[];
};

export default function Task({ activity, tags = [] }: TaskProps) {
	const { checkboxRef, openDetailedItemModal, putCompletion } = useTask(activity);

	return (
		<T.Task
			$completed={activity.completed}
			onClick={(e) => {
				e.stopPropagation();
				openDetailedItemModal(activity.activity_id);
			}}
		>
			<S.CheckboxWrapper
				ref={checkboxRef}
				onClick={(e) => {
					e.stopPropagation(); // This prevents the task from being opened when the checkbox is clicked.
				}}
			>
				<Checkbox checked={activity.completed} onChange={putCompletion} />
			</S.CheckboxWrapper>
			<T.Times>
				<span>from {formatToHHmm(activityStart(activity))}</span>
				<span>to {formatToHHmm(activityEnd(activity))}</span>
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
