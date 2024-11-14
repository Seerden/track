import HabitEntrySlider from "@/components/habits/HabitEntryItem/HabitEntrySlider";
import HabitEntryToggle from "@/components/habits/HabitEntryItem/HabitEntryToggle";
import useCompletionInstance from "@/components/habits/HabitEntryItem/useCompletionInstance";
import type {
	HabitEntry,
	HabitWithIds,
	SyntheticHabitEntry
} from "@/types/server/habit.types";

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