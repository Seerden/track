import type {
	HabitWithPossiblySyntheticEntries,
	PossiblySyntheticHabitEntry,
} from "@shared/lib/schemas/habit";
import HabitEntrySlider from "@/components/habits/Habits/HabitEntrySlider";
import HabitEntryToggle from "@/components/habits/Habits/HabitEntryToggle";
import useCompletionInstance from "@/components/habits/Habits/useCompletionInstance";

type CompletionInstanceProps = {
	entry: PossiblySyntheticHabitEntry;
	habit: HabitWithPossiblySyntheticEntries;
	sliderWidth?: string;
};

export default function CompletionInstance({
	entry,
	habit,
	sliderWidth,
}: CompletionInstanceProps) {
	const { doMutation } = useCompletionInstance();

	switch (habit.goal_type) {
		case "goal":
			return (
				<HabitEntrySlider
					entry={entry}
					habit={habit}
					onChangeEnd={doMutation}
					width={sliderWidth}
				/>
			);
		case "checkbox":
			return (
				<HabitEntryToggle entry={entry} habit={habit} onChange={doMutation} />
			);
		default:
			return null;
	}
}
