import ActivityForm from "@/components/activities/ActivityForm/ActivityForm";
import S from "@/components/Today/style/DetailedActivity.style";
import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import Modal from "@/components/utility/Modal/Modal";
import { activityEnd, activityStart, hasNotEnded, startsInFuture } from "@/lib/activity";
import { createDate } from "@/lib/datetime/make-date";
import useQueryTags from "@/lib/hooks/query/tags/useQueryTags";
import useDetailedItemModal from "@/lib/hooks/useDetailedItemModal";
import usePutTaskCompletion from "@/lib/hooks/usePutTaskCompletion";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import CardStyle from "@/lib/theme/components/Card.style";
import type { ActivityWithIds } from "@shared/types/data/activity.types";
import type { Datelike } from "@shared/types/data/utility.types";
import { PenLine } from "lucide-react";

type DetailedActivityProps = {
	activity: ActivityWithIds;
};

// TODO: instead of this, do time (humanizedDate), with a tooltip on
// humanizedDate that shows the full date.
function format(date: Datelike) {
	return createDate(date).format("HH:mm (YYYY/MM/DD)");
}

export default function DetailedActivity({ activity }: DetailedActivityProps) {
	const { data: tagsData } = useQueryTags();
	const putCompletion = usePutTaskCompletion(activity);
	const humanizedStart = `${startsInFuture(activity) ? "starts" : "started"} ${activityStart(activity).fromNow()}`;
	const showHumanizedStart = hasNotEnded(activity);
	const { openDetailedItemModal } = useDetailedItemModal("tag", modalIds.tags.detailed);
	const { openModal } = useModalState();

	return (
		<S.Wrapper>
			<S.Title>
				{activity.is_task && (
					<S.CheckboxWrapper>
						<Checkbox checked={activity.completed} onChange={putCompletion} />
					</S.CheckboxWrapper>
				)}
				<span>{activity.name}</span>
			</S.Title>

			<S.EditButton
				$color="blue"
				onClick={(e) => {
					e.stopPropagation();
					openModal(modalIds.activities.form);
				}}
			>
				<PenLine size={20} />
			</S.EditButton>

			{!!activity.description.length && (
				<S.Description>{activity.description}</S.Description>
			)}

			<S.Time>
				{showHumanizedStart && (
					<CardStyle.InfoLine>
						<S.HumanizedStart>{humanizedStart}</S.HumanizedStart>
					</CardStyle.InfoLine>
				)}
				<S.Datetime>
					<span>
						from <span>{format(activityStart(activity))}</span>
					</span>
					<span>
						to <span>{format(activityEnd(activity))}</span>
					</span>
				</S.Datetime>
			</S.Time>

			{!!activity.is_task && (
				<S.Task>
					{activity.completed && (
						<S.Datetime>
							{activity.completion_start && (
								<>from {format(activity.completion_start)}</>
							)}
							{activity.completion_end && (
								<>to {format(activity.completion_end)}</>
							)}
						</S.Datetime>
					)}
				</S.Task>
			)}

			{tagsData?.byId && (
				<S.Tags
					style={{
						gridArea: "tags"
					}}
				>
					{activity.tag_ids.map((id) => {
						const tag = tagsData.byId.get(String(id));
						if (!tag) return null;
						return (
							<S.Tag
								onClick={(e) => {
									e.stopPropagation();
									openDetailedItemModal(tag.tag_id);
								}}
								key={id}
							>
								{tag.name}
							</S.Tag>
						);
					})}
				</S.Tags>
			)}

			{/* TODO: rename to a different modalId because it's not strictly a "new" activity anymore */}
			<Modal modalId={modalIds.activities.form}>
				<ActivityForm activity={activity} modalId={modalIds.activities.form} />
			</Modal>
		</S.Wrapper>
	);
}
