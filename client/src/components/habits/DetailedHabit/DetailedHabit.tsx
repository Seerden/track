import F from "@components/Today/style/Detailed.style";
import { Popover } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { isNullish } from "@shared/lib/is-nullish";
import type { HabitWithEntries } from "@shared/lib/schemas/habit";
import { useAtomValue } from "jotai";
import { LucideX } from "lucide-react";
import type { MouseEvent, PropsWithChildren, ReactNode } from "react";
import { createDate } from "@/lib/datetime/make-date";
import useMutateDeleteHabit from "@/lib/hooks/query/habits/useMutateDeleteHabit";
import { useQueryTags } from "@/lib/hooks/query/tags/useQueryTags";
import useDetailedItemModal from "@/lib/hooks/useDetailedItemModal";
import useHabitsData from "@/lib/hooks/useHabitsData";
import modalIds from "@/lib/modal-ids";
import { timeWindowAtom } from "@/lib/state/time-window.state";
import Buttons from "@/lib/theme/components/buttons";
import C from "@/lib/theme/components/Card.style";
import Containers from "@/lib/theme/components/container.style";
import { actionDropdownStyle } from "@/lib/theme/components/containers/popover.style";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import HabitCalendar from "../calendar/HabitCalendar";
import S from "./style/DetailedHabit.style";

type DetailedHabitProps = {
	habit: HabitWithEntries;
};

export default function DetailedHabit({
	habit: _habit,
}: PropsWithChildren<DetailedHabitProps>) {
	const { data: tags } = useQueryTags();
	// NOTE: we do not use getHabitsForTimeWindow, because for the habit
	// calendar, we want to create synthetic habits for potentially any date.
	const { getHabitById } = useHabitsData();
	const habit = getHabitById(_habit.habit_id);

	const { openDetailedItemModal } = useDetailedItemModal(
		"tag",
		modalIds.tags.detailed
	);
	const timeWindow = useAtomValue(timeWindowAtom);

	if (!habit) return null;

	const humanizedStart = createDate(habit.start_timestamp).fromNow();
	const humanizedEnd = habit.end_timestamp
		? createDate(habit.end_timestamp).fromNow()
		: null;
	const humanizedFrequency = `${habit.frequency} time(s) per ${habit.interval} ${habit.interval_unit}(s)`; // TODO: consider using frequencyString from elsewhere

	const { mutate } = useMutateDeleteHabit();

	function handleDeleteHabit(e: MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();

		// notification
		if (!habit) return;

		mutate(habit.habit_id);
	}

	return (
		<>
			<S.DetailedHabitCard>
				<C.Title>{habit.name}</C.Title>

				<F.ActionBar>
					{/* action bar: share styles from DetailedActivity */}

					<TwoStepDelete
						disabled={isNullish(habit.habit_id)}
						title="Delete this habit?"
						handleConfirmClick={handleDeleteHabit}
						confirmLabel="Delete"
						rejectLabel="Keep"
					/>
				</F.ActionBar>
				<p>{habit.description}</p>
				<S.InfoFields>
					{habit.goal_type === "goal" && (
						<C.InfoLine>
							<C.InfoLabel>Goal</C.InfoLabel>
							<C.InfoValue>
								{habit.goal} {habit.goal_unit}
							</C.InfoValue>
						</C.InfoLine>
					)}
					<C.InfoLine>
						<C.InfoLabel>How often?</C.InfoLabel>
						<C.InfoValue>{humanizedFrequency}</C.InfoValue>
					</C.InfoLine>
				</S.InfoFields>
				<C.Datetime
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
					}}
				>
					<span>Tracking started {humanizedStart}</span>
					{habit.end_timestamp && <span>Tracking ends {humanizedEnd}</span>}
				</C.Datetime>

				{tags && (
					<C.Tags>
						{habit.tag_ids.map((id) => (
							<C.Tag
								key={id}
								onClick={(e) => {
									e.stopPropagation();
									openDetailedItemModal(id);
								}}
							>
								{/* TODO: See #176 */}
								{tags.get(id)?.name}
							</C.Tag>
						))}
					</C.Tags>
				)}
			</S.DetailedHabitCard>
			<HabitCalendar habit={habit} date={timeWindow.startDate} />
		</>
	);
}

// TODO: reuse this in DetailedActivity
function TwoStepDelete({
	disabled,
	title,
	handleConfirmClick,
	confirmLabel,
	rejectLabel,
}: {
	disabled?: boolean;
	title: string | ReactNode;
	handleConfirmClick: (e: MouseEvent<HTMLButtonElement>) => void;
	confirmLabel: string | ReactNode;
	rejectLabel: string | ReactNode;
}) {
	const [opened, { toggle, close }] = useDisclosure(false);

	return (
		<Popover
			withArrow
			opened={opened}
			onChange={toggle}
			trapFocus
			closeOnClickOutside
		>
			<Popover.Target>
				<Buttons.Action.Stylized
					disabled={disabled}
					$color="orange"
					type="button"
					onClick={toggle}
				>
					<LucideX size={20} />
				</Buttons.Action.Stylized>
			</Popover.Target>
			<Popover.Dropdown style={actionDropdownStyle}>
				{title}
				<Containers.Row gap="small" style={{ marginTop: spacingValue.smaller }}>
					<Buttons.Action.DefaultText
						$color="red"
						type="button"
						onClick={handleConfirmClick}
					>
						{confirmLabel}
					</Buttons.Action.DefaultText>
					<Buttons.Action.DefaultText $minimal type="button" onClick={close}>
						{rejectLabel}
					</Buttons.Action.DefaultText>
				</Containers.Row>
			</Popover.Dropdown>
		</Popover>
	);
}
