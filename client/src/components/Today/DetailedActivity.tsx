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
import { invalidateActivities } from "@/lib/hooks/query/invalidate";
import modalIds from "@/lib/modal-ids";
import Buttons from "@/lib/theme/components/buttons";
import Card from "@/lib/theme/components/Card.style";
import Containers from "@/lib/theme/components/container.style";
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
		mutate,
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

			<div
				style={{
					position: "absolute",
					top: "-1rem",
					right: "6rem",
					display: "flex",
					flexDirection: "row",
					gap: spacingValue.medium,
					justifyContent: "flex-end",
				}}
			>
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
								$color="blue"
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									toggle();
								}}
							>
								<LucideX size={20} />
							</Buttons.Action.Stylized>
						</Tooltip>
					</Popover.Target>
					<Popover.Dropdown
						style={{
							boxShadow: "0 0.2rem 0.3rem -0.1rem #888",
							backgroundColor: "#ddd",
						}}
					>
						Delete this activity?
						<Containers.Row
							gap="small"
							style={{ marginTop: spacingValue.smaller }}
						>
							<Buttons.Action.Default
								$color="red"
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									// prevents attempting to delete a synthetic activity
									if (activity.activity_id) {
										mutate(
											{ activity_id: activity.activity_id },
											{
												onSuccess: () => {
													close();
													invalidateActivities();
													// TODO (TRK-268) show a notification
												},
											}
										);
									}
								}}
								style={{
									width: "max-content",
									borderRadius: "3px",
									paddingInline: spacingValue.small,
									fontSize: "0.9rem",
								}}
							>
								Delete
							</Buttons.Action.Default>
							<Buttons.Action.Default
								$minimal
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									close();
								}}
								style={{
									width: "max-content",
									borderRadius: "3px",
									paddingInline: spacingValue.small,
									fontSize: "0.9rem",
								}}
							>
								Keep
							</Buttons.Action.Default>
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
			</div>

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
