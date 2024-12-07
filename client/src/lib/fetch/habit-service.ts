import api from "@/lib/fetch/api";
import type { HabitEntriesData, HabitsData } from "@/types/data.types";
import type {
	Habit,
	HabitEntry,
	HabitEntryInput,
	HabitEntryUpdateInput,
	HabitInput,
	HabitWithIds
} from "@t/data/habit.types";

export async function getHabits() {
	return api.get<HabitsData>({ url: "/data/habits" });
}

export async function getHabitEntries() {
	return api.get<HabitEntriesData>({ url: "/data/habit/entries" });
}

export async function deleteHabit({ habit_id }: Pick<Habit, "habit_id">) {
	return api.delete<Pick<Habit, "habit_id">>({ url: `/data/habit/${habit_id}` });
}

export async function putHabitEntry(input: HabitEntryUpdateInput) {
	return api.put<HabitEntryUpdateInput, HabitEntry>({
		url: "/data/habit/entry",
		body: input
	});
}

export async function postHabitEntry(input: HabitEntryInput) {
	return api.post<HabitEntryInput, HabitEntry>({
		url: "/data/habit/entry",
		body: input
	});
}

export async function postNewHabit(input: HabitInput): Promise<HabitWithIds> {
	return api.post<HabitInput, HabitWithIds>({ url: "/data/habit", body: input });
}
