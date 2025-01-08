import { habitEntryIsDone } from "@/components/habits/Habits/entry-is-completed";
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

type CircularProgressProps = {
	percentage: number;
	size: number;
};

function CircularProgress({ percentage, size }: CircularProgressProps) {
	const thickness = 2; // should make the thickness configurable
	const radius = size / 2 - thickness / 2; // 30px is the size of the completion badge -- should be configurable
	const circumference = 2 * Math.PI * radius;
	const offset = thickness;

	return (
		<S.Svg $size={size} $offset={offset}>
			<S.Circle
				$offset={offset}
				$done={percentage >= 100}
				cx="50%"
				cy="50%"
				r={radius}
				$circumference={circumference}
				$thickness={thickness}
				$percentage={percentage}
			/>
		</S.Svg>
	);
}
