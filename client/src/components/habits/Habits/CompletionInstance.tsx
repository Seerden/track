import type {
	HabitEntry,
	HabitWithEntries,
	SyntheticHabitEntry,
} from "@shared/lib/schemas/habit";
import HabitEntrySlider from "@/components/habits/Habits/HabitEntrySlider";
import HabitEntryToggle from "@/components/habits/Habits/HabitEntryToggle";
import useCompletionInstance from "@/components/habits/Habits/useCompletionInstance";

type CompletionInstanceProps = {
	entry: HabitEntry | SyntheticHabitEntry;
	habit: HabitWithEntries;
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
					showLabelText={false}
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
