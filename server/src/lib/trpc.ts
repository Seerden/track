import {
	createTRPCClient,
	httpBatchLink,
	httpLink,
	isNonJsonSerializable,
	splitLink,
} from "@trpc/client";
import superjson from "superjson";
import { activitiesRouter } from "@/lib/trpc/routers/activities.router";
import { habitsRouter } from "@/lib/trpc/routers/habits.router";
import { notesRouter } from "@/lib/trpc/routers/notes.router";
import { tagsRouter } from "@/lib/trpc/routers/tags.router";
import { t } from "./trpc/trpc-context";
import "dotenv/config";
import { pushRouter } from "./trpc/routers/push.router";
import { usersRouter } from "./trpc/routers/users.router";

export const appRouter = t.router({
	habits: habitsRouter,
	notes: notesRouter,
	activities: activitiesRouter,
	tags: tagsRouter,
	push: pushRouter,
	user: usersRouter,
});

export type AppRouter = typeof appRouter;

const DOMAIN = process.env.DOMAIN ?? "localhost";
const PROTOCOL = process.env.NODE_ENV === "production" ? "https" : "http";
const HOST = process.env.NODE_ENV === "production" ? DOMAIN : "localhost";
const SERVER_PORT = process.env.PORT ?? "5000";
const url = `${PROTOCOL}://${HOST}:${SERVER_PORT}/api/trpc`;

export const proxyClient = createTRPCClient<AppRouter>({
	links: [
		splitLink({
			condition: (op) => isNonJsonSerializable(op.input),
			true: httpLink({
				url,
				transformer: {
					// request - convert data before sending to the tRPC server
					serialize: (data) => data,
					// response - convert the tRPC response before using it in client
					deserialize: superjson.deserialize, // or your other transformer
				},
			}),
			false: httpBatchLink({
				transformer: superjson,
				url,
				fetch(url, options) {
					return fetch(url, {
						...options,
						credentials: "include",
					});
				},
			}),
		}),
	],
});
