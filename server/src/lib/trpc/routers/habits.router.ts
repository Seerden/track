import { deleteHabitByIdResolver } from "@/lib/trpc/resolvers/habit/delete-habits";
import {
	createHabit,
	createHabitEntry,
} from "@/lib/trpc/resolvers/habit/insert-habits";
import {
	queryHabitEntries,
	queryHabitsAndRelations,
} from "@/lib/trpc/resolvers/habit/query-habits";
import {
	updateEntry,
	updateHabit,
} from "@/lib/trpc/resolvers/habit/update-habits";
import { t } from "@/lib/trpc/trpc-context";

export const habitRouter = t.router({
	all: queryHabitsAndRelations,
	entries: queryHabitEntries,
	delete: deleteHabitByIdResolver,
	update: updateHabit,
	updateEntry,
	create: createHabit,
	createEntry: createHabitEntry,
});
