import CompletionInstance from "@/components/habits/Habits/CompletionInstance";
import type {
	HabitEntry,
	HabitWithIds,
	SyntheticHabitEntry
} from "@shared/types/data/habit.types";
import S from "./style/Completion.style";

type CompletionProps = {
	habit: HabitWithIds;
	entries: Array<HabitEntry | SyntheticHabitEntry>;
};

export default function Completion({ habit, entries }: CompletionProps) {
	return (
		<S.List $itemCount={entries.length}>
			{entries.map((entry) => (
				<CompletionInstance
					// TODO: figure this out ⬇️
					// note that index is not unique even for the same habit. index
					// is just the order on a given day. the actual displayed order
					// should not be by index, but by created_at.
					// TODO: actually, do we need `index` at all?
					key={`${entry.created_at}-${entry.index}`}
					entry={entry}
					habit={habit}
				/>
			))}
		</S.List>
	);
}
