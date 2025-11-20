import { isNullish } from "@shared/lib/is-nullish";
import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import type { Datelike } from "@shared/lib/schemas/timestamp";
import { PenLine as LucidePenLine } from "lucide-react";
import ActivityForm from "@/components/activities/ActivityForm/ActivityForm";
import S from "@/components/Today/style/DetailedActivity.style";
import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import Modal from "@/components/utility/Modal/Modal";
import { activityEnd, activityStart } from "@/lib/activity";
import { createDate } from "@/lib/datetime/make-date";
import modalIds from "@/lib/modal-ids";
import Buttons from "@/lib/theme/components/buttons";
import Card from "@/lib/theme/components/Card.style";
import TwoStepDelete from "../../utility/Modal/TwoStepDelete";
import F from "../style/Detailed.style";
import { RecurrenceCard } from "./RecurrenceCard";
import { useDetailedActivity } from "./useDetailedActivity";

// TODO: instead of this, do time (humanizedDate), with a tooltip on
// humanizedDate that shows the full date.
function format(date: Datelike) {
	return createDate(date).format("HH:mm (YYYY/MM/DD)");
}

export default function DetailedActivity({
	activity,
	DEBUG,
}: {
	activity: PossiblySyntheticActivity;
	DEBUG?: boolean;
}) {
	const {
		humanizedStart,
		openDetailedItemModal,
		openModal,
		putCompletion,
		recurrence,
		showHumanizedStart,
		tags,
		handleDeleteActivity,
	} = useDetailedActivity({ activity });

	return (
		<S.Wrapper>
			<S.Title>
				{activity.is_task && (
					<S.CheckboxWrapper>
						<Checkbox
							checked={activity.completed ?? false}
							onChange={putCompletion}
						/>
					</S.CheckboxWrapper>
				)}
				<span>{activity.name}</span>
			</S.Title>

			<F.ActionBar>
				<TwoStepDelete
					confirmLabel="Delete"
					rejectLabel="Keep"
					handleConfirmClick={handleDeleteActivity}
					title="Delete this activity?"
					disabled={
						isNullish(activity.activity_id) ||
						!isNullish(activity.recurrence_id)
					}
				/>

				<Buttons.Action.Stylized
					type="button"
					title="Edit this activity"
					$color="royalblue"
					onClick={(e) => {
						e.stopPropagation();
						openModal(modalIds.activities.form);
					}}
				>
					<LucidePenLine size={20} />
				</Buttons.Action.Stylized>
			</F.ActionBar>

			{!!activity.description?.length && <div>{activity.description}</div>}

			<S.Time>
				{showHumanizedStart && (
					<Card.InfoLine>
						<Card.InfoValue>{humanizedStart}</Card.InfoValue>
					</Card.InfoLine>
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

			{tags && (
				<S.Tags style={{ gridArea: "tags" }}>
					{activity.tag_ids.map((id) => {
						const tag = tags.get(id);
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

			{!!recurrence && (
				<S.RecurrenceCardContainer>
					<RecurrenceCard recurrence={recurrence} />
				</S.RecurrenceCardContainer>
			)}

			{DEBUG && (
				<span
					style={{
						position: "absolute",
						bottom: "0.5rem",
						right: "1.5rem",
						opacity: 0.3,
					}}
				>
					ID {activity.activity_id ?? activity.synthetic_id}
				</span>
			)}
		</S.Wrapper>
	);
}
