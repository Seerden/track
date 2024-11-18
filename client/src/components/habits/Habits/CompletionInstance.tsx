import HabitEntrySlider from "@/components/habits/Habits/HabitEntrySlider";
import HabitEntryToggle from "@/components/habits/Habits/HabitEntryToggle";
import useCompletionInstance from "@/components/habits/Habits/useCompletionInstance";
import type { HabitEntry, HabitWithIds, SyntheticHabitEntry } from "@t/data/habit.types";

type CompletionInstanceProps = {
	entry: HabitEntry | SyntheticHabitEntry;
	habit: HabitWithIds;
};

export default function CompletionInstance({ entry, habit }: CompletionInstanceProps) {
	const { doMutation } = useCompletionInstance();

	switch (habit.goal_type) {
		case "goal":
			return <HabitEntrySlider entry={entry} habit={habit} onChangeEnd={doMutation} />;
		case "checkbox":
			return <HabitEntryToggle entry={entry} habit={habit} onChange={doMutation} />;
		default:
			return null;
	}
}
