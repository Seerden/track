import CompletionInstance from "@/components/habits/HabitEntryItem/CompletionInstance";
import type {
	HabitEntry,
	HabitWithIds,
	SyntheticHabitEntry
} from "@/types/server/habit.types";

type CompletionProps = {
	habit: HabitWithIds;
	entries: Array<HabitEntry | SyntheticHabitEntry>;
};

export default function Completion({ habit, entries }: CompletionProps) {
	return (
		<ul
			style={{
				width: "100%",
				display: "grid",
				gap: "0.8rem",
				gridTemplateColumns: `repeat(${entries.length}, calc(100% / ${entries.length} - 0.8rem))`
			}}
		>
			{entries.map((entry) => (
				<CompletionInstance
					// note that index is not unique even for the same habit. index
					// is just the order on a given day. the actual displayed order
					// should not be by index, but by created_at.
					// TODO: actually, do we need `index` at all?
					key={`${entry.created_at}-${entry.index}`}
					entry={entry}
					habit={habit}
				/>
			))}
		</ul>
	);
}
