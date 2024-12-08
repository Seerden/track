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

async function getHabits() {
	return api.get<HabitsData>({ url: "/data/habits" });
}

async function getHabitEntries() {
	return api.get<HabitEntriesData>({ url: "/data/habit/entries" });
}

async function deleteHabit({ habit_id }: Pick<Habit, "habit_id">) {
	return api.delete<Pick<Habit, "habit_id">>({ url: `/data/habit/${habit_id}` });
}

async function putHabitEntry(input: HabitEntryUpdateInput) {
	return api.put<HabitEntryUpdateInput, HabitEntry>({
		url: "/data/habit/entry",
		body: input
	});
}

async function postHabitEntry(input: HabitEntryInput) {
	return api.post<HabitEntryInput, HabitEntry>({
		url: "/data/habit/entry",
		body: input
	});
}

async function postNewHabit(input: HabitInput): Promise<HabitWithIds> {
	return api.post<HabitInput, HabitWithIds>({ url: "/data/habit", body: input });
}

// NOTE: not defining these functions inline like with the other services to see
// if it makes the code more readable.
const habitService = {
	getByUser: getHabits,
	getEntriesByUser: getHabitEntries,
	delete: deleteHabit,
	putEntry: putHabitEntry,
	postEntry: postHabitEntry,
	post: postNewHabit
};

export default habitService;
