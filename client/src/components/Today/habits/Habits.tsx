import type { HabitWithPossiblySyntheticEntries } from "@shared/lib/schemas/habit";
import type { MapById } from "@shared/types/data/utility.types";
import { useAtom } from "jotai";
import { LucideCheck, LucideCheckCheck, LucideCircleDot } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import BlockHeader from "@/components/Today/BlockHeader";
import Empty from "@/components/Today/Empty";
import Habit from "@/components/Today/habits/Habit";
import {
	HABIT_FILTER,
	type HabitFilter,
	habitFilterAtom,
	useHabits,
} from "@/components/Today/habits/useHabits";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import Containers from "@/lib/theme/components/container.style";
import S from "./style/Habits.style";

export default function Habits({
	habits,
}: {
	habits: MapById<HabitWithPossiblySyntheticEntries>;
}) {
	const {
		showFilter,
		setShowFilter,
		nameFilter,
		toggleFilter,
		handleNameFilterChange,
		habitsList,
		filteredHabits,
	} = useHabits(habits);
	const { openModal } = useModalState();

	return (
		<S.Habits>
			<HabitsHeader
				showFilter={showFilter}
				setShowFilter={setShowFilter}
				nameFilter={nameFilter}
				toggleFilter={toggleFilter}
				handleNameFilterChange={handleNameFilterChange}
			/>

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

const habitSelectionRadioOptions = [
	{
		value: HABIT_FILTER.ALL,
		tooltipLabel: "show all habits",
		Icon: LucideCircleDot,
	},
	{
		value: HABIT_FILTER.TODAY,
		tooltipLabel: "hide if completed today",
		Icon: LucideCheck,
	},
	{
		value: HABIT_FILTER.INTERVAL,
		tooltipLabel: "hide if completed in interval",
		Icon: LucideCheckCheck,
	},
];

function HabitsHeader({
	showFilter,
	setShowFilter,
	toggleFilter,
	nameFilter,
	handleNameFilterChange,
}: Pick<
	ReturnType<typeof useHabits>,
	| "showFilter"
	| "setShowFilter"
	| "toggleFilter"
	| "nameFilter"
	| "handleNameFilterChange"
>) {
	const [habitFilter, setHabitFilter] = useAtom(habitFilterAtom);
	return (
		<BlockHeader
			checked={(value: string | undefined) => habitFilter === value}
			onPopoverClose={() => setShowFilter(false)}
			onRadioValueChange={(value) => setHabitFilter?.(value as HabitFilter)}
			onSearchValueChange={handleNameFilterChange}
			popoverOpened={showFilter}
			radioGroupLabel="Habit filter"
			radioOptions={habitSelectionRadioOptions}
			radioValue={habitFilter}
			searchValue={nameFilter}
			title={"Habits"}
			togglePopover={toggleFilter}
			triggerAriaLabel={"Toggle habit filter"}
			triggerTooltipOff={"Showing all habits"}
			triggerTooltipOn={"Filter applied to habits"}
			labelOn={habitFilter !== HABIT_FILTER.ALL || !!nameFilter.length}
		/>
	);
}
