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
	const thickness = 1.5;

	const radius = 15 - thickness / 2;
	const circumference = 2 * Math.PI * radius;
	return (
		<S.Badge>
			<S.Svg>
				<S.Circle
					cx="50%"
					cy="50%"
					r={radius}
					$circumference={circumference}
					$percentage={90}
					$thickness={thickness}
				/>
			</S.Svg>
			{entries.length}
		</S.Badge>
	);
}
