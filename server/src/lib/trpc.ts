import { sqlConnection } from "@/db/init";
import {
	deleteOccurrenceById,
	deleteRecurrenceById,
} from "@/lib/trpc/resolvers/activity/delete-recurrences";
import { createActivity } from "@/lib/trpc/resolvers/activity/insert-activities";
import {
	_createRecurrence,
	createOccurrence,
} from "@/lib/trpc/resolvers/activity/insert-recurrences";
import { queryActivities } from "@/lib/trpc/resolvers/activity/query-activities";
import {
	_getRecurrenceByActivity,
	_getRecurrencesByUser,
	_queryOccurrencesByRecurrence,
	_queryOccurrencesByUser,
} from "@/lib/trpc/resolvers/activity/query-recurrences";
import {
	updateActivity,
	updateTaskCompletion,
} from "@/lib/trpc/resolvers/activity/update-activities";
import {
	_updateOccurrence,
	_updateRecurrence,
} from "@/lib/trpc/resolvers/activity/update-recurrences";
import { deleteHabitById } from "@/lib/trpc/resolvers/habit/delete-habits";
import { createHabit, createHabitEntry } from "@/lib/trpc/resolvers/habit/insert-habits";
import {
	queryHabitEntries,
	queryHabitsAndRelations,
} from "@/lib/trpc/resolvers/habit/query-habits";
import { updateEntry, updateHabit } from "@/lib/trpc/resolvers/habit/update-habits";
import { login } from "@/lib/trpc/resolvers/login";
import { logout } from "@/lib/trpc/resolvers/logout";
import { me } from "@/lib/trpc/resolvers/me";
import { createNote } from "@/lib/trpc/resolvers/note/insert-notes";
import { queryNotes } from "@/lib/trpc/resolvers/note/query-notes";
import { register } from "@/lib/trpc/resolvers/register";
import { createTag } from "@/lib/trpc/resolvers/tag/insert-tags";
import { queryTags, queryTagTree } from "@/lib/trpc/resolvers/tag/query-tags";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { z } from "zod";
import { publicProcedure } from "./trpc/procedures/public.procedure";
import { t } from "./trpc/trpc-context";

export const appRouter = t.router({
	hello: publicProcedure
		.input(z.object({ name: z.string() }))
		.query(({ input, ctx }) => {
			return { message: `Hello, ${input.name}!` };
		}),
	bye: publicProcedure.input(z.object({ name: z.string() })).query(({ input, ctx }) => {
		return { message: `Hello, ${input.name}!` };
	}),
	dbTest: publicProcedure.query(async () => {
		{
			// const result = await pingDatabase();
			return {
				sql: sqlConnection,
				db: await sqlConnection`select array[1]`,
				env: process.env,
				who: "am i",
			};
		}
	}),
	auth: {
		me,
		login,
		logout,
		register,
	},
	habits: {
		delete: deleteHabitById,
		all: queryHabitsAndRelations,
		entries: queryHabitEntries,
		update: updateHabit,
		updateEntry,
		create: createHabit,
		createEntry: createHabitEntry,
	},
	notes: {
		all: queryNotes,
		create: createNote,
	},
	activities: {
		all: queryActivities,
		create: createActivity,
		update: updateActivity,
		updateCompletion: updateTaskCompletion,
		recurrences: {
			queryByUser: _getRecurrencesByUser,
			queryByActivity: _getRecurrenceByActivity,
			create: _createRecurrence,
			delete: deleteRecurrenceById,
			update: _updateRecurrence,
		},
		occurrences: {
			queryByRecurrence: _queryOccurrencesByRecurrence,
			queryByUser: _queryOccurrencesByUser,
			create: createOccurrence,
			delete: deleteOccurrenceById,
			update: _updateOccurrence,
		},
	},
	tags: {
		all: queryTags,
		tree: queryTagTree,
		create: createTag,
	},
});

export type AppRouter = typeof appRouter;

export const proxyClient = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			transformer: superjson,
			url: "http://localhost:5000/api/trpc", // TODO: needs to match what we use in the client, I guess
			fetch(url, options) {
				return fetch(url, {
					...options,
					credentials: "include",
				});
			},
		}),
	],
});
