import { initTRPC } from "@trpc/server";
import type * as trpcExpress from "@trpc/server/adapters/express";
import superjson from "superjson";

export const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({
	req,
	res,
});

export type Context = Awaited<ReturnType<typeof createContext>>;

export const t = initTRPC.context<Context>().create({
	transformer: superjson,
});
