// MUST BE TOP OF FILE
import "./instrument";
// ^
import * as Sentry from "@sentry/node";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import "dotenv/config";
import type { RequestHandler } from "express";
import express from "express";
import session from "express-session";
import path from "path";
import { onError } from "./instrument";
import { pingDatabase } from "./src/db/init";
import { NODE__dirname } from "./src/lib/build.utility";
import { logRequests } from "./src/lib/log-requests";
import {
	initializeRedisConnection,
	redisSession,
} from "./src/lib/redis/redis-client";
import { appRouter } from "./src/lib/trpc";
import { createContext } from "./src/lib/trpc/trpc-context";
import { routers } from "./src/routers/routers";
import { runAtStartup } from "./src/start";

async function start() {
	const app = express();

	app.use(
		cors({
			origin:
				process.env.NODE_ENV === "production" ? "track.seerden.dev" : true,
			credentials: true,
		})
	);

	app.use(logRequests);

	app.use(
		express.urlencoded({
			limit: "5mb",
			parameterLimit: 10000,
			extended: true,
		}) as RequestHandler
	);

	await initializeRedisConnection();
	await pingDatabase();
	app.use(session(redisSession));

	// Have to parse the body as text to forward to Sentry
	app.use("/sentry", express.text({ limit: "5mb" }), routers.sentry);

	// For the non-sentry routes, we can parse the body as JSON.
	app.use(express.json() as RequestHandler);

	app.use(
		"/api/trpc",
		trpcExpress.createExpressMiddleware({
			router: appRouter,
			createContext,
			onError: (opts) => {
				console.log({ error: opts.error, body: opts.req.body }); // TODO: proper error handling
			},
			allowBatching: true, // this _should_ be the default, but I was having issues with empty request bodies, and this may have fixed it.
		})
	);

	if (!(process.env.NODE_ENV === "production")) {
		app.use("/", routers.index); // even in dev, we don't use this, but this is to make sure it's definitely not used in production
		app.use("/data", routers.data); // deprecated
	}

	Sentry.setupExpressErrorHandler(app);
	app.use(onError);

	if (process.env.NODE_ENV === "production") {
		app.use(express.static(path.join(NODE__dirname, "public")));
		app.set("trust proxy", "172.17.0.0/16"); // Trust Docker's default bridge network // TODO: is this necessary?

		// note: since express v5, wildcard routes need to be named. I don't even
		// know what "splat" could be used for, but I saw it in an example, so that's
		// why I'm calling it that.
		app.get("*splat", (_req, res) => {
			res.sendFile(path.join(NODE__dirname, "public", "index.html"));
		});
	}

	const port = process.env.PORT || 5000;

	await runAtStartup();

	app.listen(port, () => {
		console.log(`Express server started on port ${port} at ${new Date()}`);
	});
}

try {
	start();
} catch (error) {
	console.error(error);
}
