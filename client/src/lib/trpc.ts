import type { AppRouter } from "@server/lib/trpc";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import {
	createTRPCContext,
	createTRPCOptionsProxy,
} from "@trpc/tanstack-react-query";
import SuperJSON from "superjson";
import { queryClient } from "@/lib/query-client";

// TODO: set domain in .env :)
const DOMAIN = import.meta.env.VITE_DOMAIN ?? "localhost";
const PROTOCOL = import.meta.env.NODE_ENV === "production" ? "https" : "http";
const HOST = import.meta.env.NODE_ENV === "production" ? DOMAIN : "localhost";
const SERVER_PORT = import.meta.env.PORT ?? "5000";
const url = `${PROTOCOL}://${HOST}:${SERVER_PORT}/api/trpc`;

export const trpcReactQuery: ReturnType<typeof createTRPCContext<AppRouter>> =
	createTRPCContext<AppRouter>();

export const trpcClient: ReturnType<typeof createTRPCClient<AppRouter>> =
	createTRPCClient<AppRouter>({
		links: [
			httpBatchLink({
				transformer: SuperJSON,
				url,
				fetch(url, options) {
					return fetch(url, {
						...options,
						credentials: "include",
					} as RequestInit);
				},
			}),
		],
	});

/**
 * Have a bug with type inference, even though our tsconfig is otherwise set up
 * perfectly fine. Using the type annotation as below, makes the error go away.
 * @see https://github.com/pnpm/pnpm/issues/6089
 * @see https://github.com/microsoft/TypeScript/issues/42873#issuecomment-1416128545
 */
export const trpc: ReturnType<typeof createTRPCOptionsProxy<AppRouter>> =
	createTRPCOptionsProxy<AppRouter>({
		client: trpcClient,
		queryClient: queryClient,
	});
