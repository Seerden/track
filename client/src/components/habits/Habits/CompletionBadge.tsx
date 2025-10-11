import type {
	HabitEntry,
	HabitWithPossiblySyntheticEntries,
	SyntheticHabitEntry,
} from "@shared/lib/schemas/habit";
import { singleHabitEntryIsDone } from "@/components/habits/Habits/entry-is-completed";
import CircularProgress from "@/components/utility/CircularProgress/CircularProgress";
import S from "./style/CompletionBadge.style";

type CompletionBadgeProps = {
	habit: HabitWithPossiblySyntheticEntries;
	entries: Array<HabitEntry | SyntheticHabitEntry>;
};

export default function CompletionBadge({
	habit,
	entries,
}: CompletionBadgeProps) {
	const completedCount = entries.filter((entry) =>
		singleHabitEntryIsDone({ habit, entry })
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
