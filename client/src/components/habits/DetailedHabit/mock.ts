import { createDate } from "@/lib/datetime/make-date";
import type { HabitWithIds } from "@/types/server/habit.types";

export const habit: HabitWithIds = {
	user_id: 4,
	created_at: new Date(),
	description: "Gotta stay active!",
	frequency: 2,
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

export const booleanHabit: HabitWithIds = {
	user_id: 4,
	created_at: new Date(),
	description: "Don't let them fall out",
	frequency: 2,
	interval: 1,
	interval_unit: "day",
	goal_type: "checkbox",
	goal: null,
	goal_unit: null,
	habit_id: 0,
	name: "Brush teeth",
	start_timestamp: new Date(),
	end_timestamp: null,
	tag_ids: [41]
};
