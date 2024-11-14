import HabitEntryItem from "@/components/habits/HabitEntryItem/HabitEntryItem";
import L from "@/lib/theme/components/List.style";
import type { HabitWithPossiblySyntheticEntries } from "@/types/server/habit.types";
import type { ById } from "@/types/server/utility.types";
import type { Timescale } from "@/types/timescale.types";

type HabitEntryItemsProps = {
	timescale: Timescale;
	habits: ById<HabitWithPossiblySyntheticEntries>;
};

export default function HabitEntryItems({ habits }: HabitEntryItemsProps) {
	return (
		<L.ItemList>
			{Object.values(habits).map((habit) => (
				<HabitEntryItem key={habit.habit_id} habit={habit} />
			))}
		</L.ItemList>
	);
}
