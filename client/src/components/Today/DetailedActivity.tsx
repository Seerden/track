import { Popover, Tooltip } from "@mantine/core";
import { isNullish } from "@shared/lib/is-nullish";
import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import type { Datelike } from "@shared/lib/schemas/timestamp";
import { LucideX, PenLine } from "lucide-react";
import ActivityForm from "@/components/activities/ActivityForm/ActivityForm";
import S from "@/components/Today/style/DetailedActivity.style";
import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import Modal from "@/components/utility/Modal/Modal";
import { activityEnd, activityStart } from "@/lib/activity";
import { createDate } from "@/lib/datetime/make-date";
import modalIds from "@/lib/modal-ids";
import Buttons from "@/lib/theme/components/buttons";
import Card from "@/lib/theme/components/Card.style";
import Containers from "@/lib/theme/components/container.style";
import { deleteActivityDropdownStyle } from "@/lib/theme/components/containers/popover.style";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import { RecurrenceCard } from "./RecurrenceCard";
import { useDetailedActivity } from "./useDetailedActiviity";

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
		opened,
		close,
		toggle,
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

			<S.ActionBar>
				<Popover
					withArrow
					opened={opened}
					onChange={toggle}
					trapFocus
					closeOnClickOutside
				>
					<Popover.Target>
						<Tooltip
							label="Recurring activities cannot be deleted yet"
							withArrow
							disabled={!activity.recurrence_id}
						>
							<Buttons.Action.Stylized
								disabled={isNullish(activity.activity_id)}
								$color="darkBlue"
								type="button"
								onClick={toggle}
							>
								<LucideX size={20} />
							</Buttons.Action.Stylized>
						</Tooltip>
					</Popover.Target>
					<Popover.Dropdown style={deleteActivityDropdownStyle}>
						Delete this activity?
						<Containers.Row
							gap="small"
							style={{ marginTop: spacingValue.smaller }}
						>
							<Buttons.Action.DefaultText
								$color="red"
								type="button"
								onClick={handleDeleteActivity}
							>
								Delete
							</Buttons.Action.DefaultText>
							<Buttons.Action.DefaultText
								$minimal
								type="button"
								onClick={close}
							>
								Keep
							</Buttons.Action.DefaultText>
						</Containers.Row>
					</Popover.Dropdown>
				</Popover>
				<Buttons.Action.Stylized
					type="button"
					title="Edit this activity"
					$color="blue"
					onClick={(e) => {
						e.stopPropagation();
						openModal(modalIds.activities.form);
					}}
				>
					<PenLine size={20} />
				</Buttons.Action.Stylized>
			</S.ActionBar>

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
