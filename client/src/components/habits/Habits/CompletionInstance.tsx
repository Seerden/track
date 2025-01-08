import HabitEntrySlider from "@/components/habits/Habits/HabitEntrySlider";
import HabitEntryToggle from "@/components/habits/Habits/HabitEntryToggle";
import useCompletionInstance from "@/components/habits/Habits/useCompletionInstance";
import type {
	HabitEntry,
	HabitWithIds,
	SyntheticHabitEntry
} from "@shared/types/data/habit.types";

type CompletionInstanceProps = {
	entry: HabitEntry | SyntheticHabitEntry;
	habit: HabitWithIds;
	width?: string;
	alwaysShowLabelText?: boolean;
};

export default function CompletionInstance({
	entry,
	habit,
	width,
	alwaysShowLabelText = true
}: CompletionInstanceProps) {
	const { doMutation } = useCompletionInstance();

	switch (habit.goal_type) {
		case "goal":
			return (
				<HabitEntrySlider
					entry={entry}
					habit={habit}
					onChangeEnd={doMutation}
					width={width}
					alwaysShowLabelText={alwaysShowLabelText}
				/>
			);
		case "checkbox":
			return <HabitEntryToggle entry={entry} habit={habit} onChange={doMutation} />;
		default:
			return null;
	}
}
