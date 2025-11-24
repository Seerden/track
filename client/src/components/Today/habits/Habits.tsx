import { useTheme } from "@emotion/react";
import {
	Popover,
	Radio,
	type RadioCardProps,
	RadioIndicator,
	TextInput,
	Tooltip,
} from "@mantine/core";
import type { HabitWithPossiblySyntheticEntries } from "@shared/lib/schemas/habit";
import type { DeepValue, MapById } from "@shared/types/data/utility.types";
import { atom, useAtom, useAtomValue } from "jotai";
import {
	LucideCheck,
	LucideCheckCheck,
	LucideChevronUp,
	LucideCircleDot,
	LucideFunnelPlus,
	type LucideIcon,
	LucideSearch,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
	habitSuccessfulInInterval,
	habitSuccessfulOnDate,
} from "@/components/habits/Habits/entry-is-completed";
import Empty from "@/components/Today/Empty";
import Habit from "@/components/Today/habits/Habit";
import { AnimatedIcon } from "@/lib/animate/AnimatedIcon";
import useHabitsData from "@/lib/hooks/useHabitsData";
import { useToggle } from "@/lib/hooks/useToggle";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import { timeWindowAtom } from "@/lib/state/time-window.state";
import type { MainTheme } from "@/lib/style/theme";
import { colors } from "@/lib/theme/colors";
import Buttons from "@/lib/theme/components/buttons";
import Containers from "@/lib/theme/components/container.style";
import { font } from "@/lib/theme/font";
import Today from "../style/Today.style";
import S from "./style/Habits.style";

const HABIT_FILTER = {
	ALL: "all",
	TODAY: "completed-today",
	INTERVAL: "completed-interval",
} as const;

type HabitFilter = DeepValue<typeof HABIT_FILTER>;

export const habitFilterAtom = atom<HabitFilter>(HABIT_FILTER.ALL);

function RadioOption(
	props: RadioCardProps & { Icon: LucideIcon; tooltipLabel: string }
) {
	const theme = useTheme() as MainTheme;
	const habitFilter = useAtomValue(habitFilterAtom);
	const isChecked = habitFilter === props.value;

	return (
		<Tooltip
			label={props.tooltipLabel}
			events={{ hover: true, focus: true, touch: true }}
		>
			<Radio.Card
				{...props}
				styles={{
					card: {
						borderRadius: "50%",
						display: "flex",
						width: "max-content",
						color: theme.colors.text.main[0],
						padding: "0.3rem",
						gap: "0.5rem",
						fontSize: font.size["0.9"],
						alignItems: "center",
						backgroundColor: isChecked
							? colors.green.secondary
							: "var(--bg-3-2)",
					},
				}}
			>
				<RadioIndicator hidden />
				<props.Icon
					size={18}
					color={isChecked ? colors.dark[0] : "currentColor"}
				/>
			</Radio.Card>
		</Tooltip>
	);
}

export default function Habits({
	habits,
}: {
	habits: MapById<HabitWithPossiblySyntheticEntries>;
}) {
	const habitsList = [...habits.values()];
	// TODO: should probably use a useHabitsDataById(id) here for performance
	// reasons.
	// and then move the visibility logic into Habit, where we can return null if
	// should be hidden.
	const { getHabitById } = useHabitsData();
	const { openModal } = useModalState();
	const [habitFilter, setHabitFilter] = useAtom(habitFilterAtom);
	const [nameFilter, setNameFilter] = useState("");
	const [[showFilter, setShowFilter], toggleFilter] = useToggle(false);
	const timeWindow = useAtomValue(timeWindowAtom);

	// TODO: need to get habit completion state from a hook:
	// - we use habitSuccessfulOnDate/habitSuccessfulIninterval, but these need
	//   access to all the relevant entries, which we do not do yet for Habits.
	//   We _do_ do that in HabitCalendar though, so however we end up
	//   implementing it, we need to share the code between this and that.

	const filteredHabits = habitsList.filter((h) => {
		const date = timeWindow.startDate;

		const withAllEntries = getHabitById(h.habit_id);
		// should throw an error if the habit doesn't exist
		if (!withAllEntries) return false;

		let show: boolean | null;
		switch (habitFilter) {
			case HABIT_FILTER.ALL: {
				show = true;
				break;
			}
			case HABIT_FILTER.TODAY: {
				show = !habitSuccessfulOnDate(withAllEntries, date);
				break;
			}
			case HABIT_FILTER.INTERVAL: {
				show = !habitSuccessfulInInterval(withAllEntries, date);
				break;
			}
		}

		if (!show) {
			return false;
		}

		if (!nameFilter?.length) return true;

		return h.name.toLowerCase().includes(nameFilter.toLowerCase());
	});

	return (
		<S.Habits>
			{/* TODO: we're gonna use this in more places, so we need to define the styles */}
			<Popover
				keepMounted
				trapFocus
				width="target"
				opened={showFilter}
				onClose={() => setShowFilter(false)}
				onDismiss={() => setShowFilter(false)}
				styles={{
					dropdown: {
						marginTop: "-0.5rem",
					},
				}}
			>
				<Popover.Target>
					<Today.BlockTitle
						// TODO: make as much of this as generic as possible, so Tasks can
						// use it, too.
						as="header"
						style={{
							width: "100%",
							display: "flex",
							paddingRight: "0.5rem",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<h2
							style={{
								display: "flex",
								width: "max-content",
							}}
						>
							Habits
						</h2>

						<Tooltip
							label={
								habitFilter === HABIT_FILTER.ALL && !nameFilter.length
									? "Showing all habits"
									: "Filter applied to habits"
							}
						>
							<Buttons.Unstyled onClick={toggleFilter}>
								<AnimatedIcon
									size={18}
									off={
										habitFilter === HABIT_FILTER.ALL ? (
											<LucideCircleDot />
										) : (
											<LucideFunnelPlus />
										)
									}
									intermediate={null}
									on={<LucideChevronUp />}
									state={showFilter}
								/>
							</Buttons.Unstyled>
						</Tooltip>
					</Today.BlockTitle>
				</Popover.Target>
				<Popover.Dropdown>
					<Containers.Row
						style={{
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Radio.Group
							aria-label="Habit filter"
							onChange={(value) => setHabitFilter(value as HabitFilter)}
							value={habitFilter}
						>
							<Containers.Row gap="small">
								<RadioOption
									value={HABIT_FILTER.ALL}
									tooltipLabel="show all habits"
									Icon={LucideCircleDot}
								/>
								<RadioOption
									value={HABIT_FILTER.TODAY}
									tooltipLabel="hide if completed today"
									Icon={LucideCheck}
								/>
								<RadioOption
									value={HABIT_FILTER.INTERVAL}
									tooltipLabel="hide if completed interval"
									Icon={LucideCheckCheck}
								/>
							</Containers.Row>
						</Radio.Group>
						<TextInput
							value={nameFilter}
							onChange={(e) => setNameFilter(e.target.value)}
							w="200"
							size="sm"
							rightSection={<LucideSearch size={15} />}
						/>
					</Containers.Row>
				</Popover.Dropdown>
			</Popover>

			{habitsList.length > 0 ? (
				// TODO: instead of this animation, I want to make the filter extend
				// around the title the way we do with the tagselector actionbar.
				<motion.div layout animate={{ marginTop: showFilter ? 70 : 0 }}>
					<Containers.Column gap="medium">
						<AnimatePresence>
							{filteredHabits.map((habit) => (
								<Habit key={habit.habit_id} habit={habit} />
							))}
						</AnimatePresence>
					</Containers.Column>
				</motion.div>
			) : (
				<Empty action={() => openModal(modalIds.habits.new)}>
					<span>No habits found for today. </span>
				</Empty>
			)}
		</S.Habits>
	);
}
