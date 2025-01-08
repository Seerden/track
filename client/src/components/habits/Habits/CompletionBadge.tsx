import { habitEntryIsDone } from "@/components/habits/Habits/entry-is-completed";
import CircularProgress from "@/components/utility/CircularProgress/CircularProgress";
import type {
	HabitEntry,
	HabitWithIds,
	SyntheticHabitEntry
} from "@shared/types/data/habit.types";
import S from "./style/CompletionBadge.style";

type CompletionBadgeProps = {
	habit: HabitWithIds;
	entries: Array<HabitEntry | SyntheticHabitEntry>;
};

export default function CompletionBadge({ habit, entries }: CompletionBadgeProps) {
	const completedCount = entries.filter((entry) =>
		habitEntryIsDone({ habit, entry })
	).length;
	const percentageCompleted = (100 * completedCount) / entries.length;

	const size = 30;

	return (
		<S.Badge $done={percentageCompleted >= 100} $size={size}>
			<CircularProgress percentage={percentageCompleted} size={size} />
			{completedCount}
		</S.Badge>
	);
}
