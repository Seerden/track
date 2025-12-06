import { initTRPC } from "@trpc/server";
import type * as trpcExpress from "@trpc/server/adapters/express";
import { fromNodeHeaders } from "better-auth/node";
import superjson from "superjson";
import { auth } from "@/auth";

export const createContext = async ({
	req,
	res,
}: trpcExpress.CreateExpressContextOptions) => {
	const session = await auth.api.getSession({
		headers: fromNodeHeaders(req.headers),
	});

	return {
		req,
		res,
		user: session?.user ?? null,
		session: session?.session ?? null,
	};
};

export type Context = Awaited<ReturnType<typeof createContext>>;

export const t = initTRPC.context<Context>().create({
	transformer: superjson,
});
