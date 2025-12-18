import { deleteHabitByIdMutation } from "@/lib/trpc/resolvers/habits/delete-habits";
import {
	createHabitEntryMutation,
	createHabitMutation,
} from "@/lib/trpc/resolvers/habits/insert-habits";
import {
	habitEntriesQuery,
	habitsAndRelationsQuery,
} from "@/lib/trpc/resolvers/habits/query-habits";
import {
	updateEntryMutation,
	updateHabitMutation,
} from "@/lib/trpc/resolvers/habits/update-habits";
import { t } from "@/lib/trpc/trpc-context";

export const habitsRouter = t.router({
	all: habitsAndRelationsQuery,
	entries: habitEntriesQuery,
	delete: deleteHabitByIdMutation,
	update: updateHabitMutation,
	updateEntry: updateEntryMutation,
	create: createHabitMutation,
	createEntry: createHabitEntryMutation,
});
