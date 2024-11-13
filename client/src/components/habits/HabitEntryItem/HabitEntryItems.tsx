import type { HabitWithEntries } from "@/components/habits/HabitEntryItem/HabitEntryItem";
import HabitEntryItem from "@/components/habits/HabitEntryItem/HabitEntryItem";
import L from "@/lib/theme/components/List.style";

type HabitEntryItemsProps = {
	habits: HabitWithEntries[];
};

export default function HabitEntryItems({ habits }: HabitEntryItemsProps) {
	return (
		<L.ItemList>
			{habits.map((habit) => (
				<HabitEntryItem key={habit.habit_id} habit={habit} />
			))}
		</L.ItemList>
	);
}
