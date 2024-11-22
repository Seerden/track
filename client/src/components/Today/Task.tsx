import { formatToHHmm } from "@/lib/datetime/format-date";
import useDetailedItemModal from "@/lib/hooks/useDetailedItemModal";
import usePutTaskCompletion from "@/lib/hooks/usePutTaskCompletion";
import modalIds from "@/lib/modal-ids";
import { Checkbox } from "@/lib/theme/components/Checkbox";
import { activityEnd, activityStart } from "@lib/activity";
import type { ActivityWithIds } from "@t/data/activity.types";
import type { TagWithIds } from "@t/data/tag.types";
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
			onClick={(e) => {
				e.stopPropagation();
				openDetailedItemModal(activity.activity_id);
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
