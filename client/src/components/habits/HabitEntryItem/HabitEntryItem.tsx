import Completion from "@/components/habits/HabitEntryItem/Completion";
import { frequencyString } from "@/components/habits/HabitEntryItem/frequency-string";
import useDetailedHabitModal from "@/components/habits/HabitEntryItem/useDetailedHabitModal";
import useHabitDeleteMutation from "@/lib/query/habits/useDeleteHabitMutation";
import L from "@/lib/theme/components/List.style";
import type { HabitWithPossiblySyntheticEntries } from "@/types/server/habit.types";

/**
 * I'm calling this `HabitEntryItem` but that's a misnomer. The component
 * represents a habit with its entries for a given date (range), so it can
 * actually have multiple entries. Only in a daily view for a habit with a
 * once-a-day frequency (or similar for week, month, etc.) will it only have a
 * single entry.
 *
 * I want to style this similarly to Tasks list items from Today, so part of
 * implementing this component will be to generalize the styles from that component.
 */

export default function HabitEntryItem({
	habit
}: {
	habit: HabitWithPossiblySyntheticEntries;
}) {
	const { mutate } = useHabitDeleteMutation();
	const { openDetailedHabitModal } = useDetailedHabitModal();

	return (
		<L.Item
			onClick={(e) => {
				e.stopPropagation();
				openDetailedHabitModal(habit.habit_id);
			}}
			style={{
				display: "grid",
				gridTemplateColumns: "subgrid",
				gridColumn: "1 / -1",
				maxWidth: "500px"
			}}
		>
			<L.ItemName>{habit.name}</L.ItemName>
			<L.Info>{frequencyString(habit)}</L.Info>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifySelf: "flex-end",
					alignItems: "center",
					gap: "1rem",
					width: "100%"
				}}
			>
				<Completion habit={habit} entries={habit.entries} />
			</div>
		</L.Item>
	);
}
