import Habit from "@/components/Habits/Habit";
import { createDate } from "@/lib/datetime/make-date";
import type { HabitWithIds } from "@/types/server/habit.types";

const habit: HabitWithIds = {
	user_id: 4,
	created_at: new Date(),
	description: "Gotta stay active!",
	frequency: 1,
	interval: 1,
	interval_unit: "day",
	goal_type: "goal",
	goal: 10_000,
	goal_unit: "steps",
	habit_id: 0,
	name: "Walk",
	start_timestamp: new Date(),
	end_timestamp: createDate(new Date()).add(1, "year"),
	tag_ids: [40]
};

export default function Habits() {
	return (
		<ul>
			<Habit habit={habit} />
		</ul>
	);
}
