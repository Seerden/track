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
import {
	queryHabitEntries,
	queryHabitsAndRelations,
} from "@/lib/trpc/resolvers/habit/query-habits";
import { login } from "@/lib/trpc/resolvers/login";
import { logout } from "@/lib/trpc/resolvers/logout";
import { me } from "@/lib/trpc/resolvers/me";
import { register } from "@/lib/trpc/resolvers/register";
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
		all: queryHabitsAndRelations,
		entries: queryHabitEntries,
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
	tags: {},
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
