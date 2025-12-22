import type { HabitWithIds, NewHabit } from "@shared/lib/schemas/habit";
import { createDate } from "@/lib/datetime/make-date";

const defaultNewHabit: NewHabit = {
	name: "",
	description: "",
	start_timestamp: createDate(new Date()),
	end_timestamp: null,
	frequency: 1,
	interval: 1,
	interval_unit: "day",
	goal_type: "checkbox",
	goal_unit: null,
	goal: null,
};

export function getInitialHabit(existingHabit?: HabitWithIds) {
	return existingHabit ?? defaultNewHabit;
}
