import api from "@/lib/fetch/api";
import type { HabitEntriesData, HabitsData } from "@/types/data.types";

export async function getHabits() {
	return api.get<HabitsData>({ url: "/data/habits" });
}

export async function getHabitEntries() {
	return api.get<HabitEntriesData>({ url: "/data/habit/entries" });
}
