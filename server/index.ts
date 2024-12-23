import cors from "cors";
import "dotenv/config";
import type { RequestHandler } from "express";
import express from "express";
import session from "express-session";
import { pingDatabase } from "./src/db/init";
import { logRequests } from "./src/lib/log-requests";
import { initializeRedisConnection, redisSession } from "./src/lib/redis/redis-client";
import { routers } from "./src/routers/routers";
import { runAtStartup } from "./src/start";

async function start() {
	const app = express();

	app.use(
		cors({
			origin: true, // Could also use client domain (in dev: http://localhost:3000)
			credentials: true,
		}),
	);

	app.use(logRequests);

	app.use(
		express.urlencoded({
			limit: "5mb",
			parameterLimit: 10000,
			extended: true,
		}) as RequestHandler,
	);

	await initializeRedisConnection();
	await pingDatabase();
	app.use(session(redisSession));

	// Have to parse the body as text to forward to Sentry
	app.use("/sentry", express.text({ limit: "5mb" }), routers.sentry);

	// For the non-sentry routes, we can parse the body as JSON.
	app.use(express.json() as RequestHandler);
	app.use("/", routers.index);
	app.use("/data", routers.data);
	app.use("/auth", routers.auth);

	const port = process.env.PORT || 5000;

	await runAtStartup();

	app.listen(port, () => {
		console.log(`Express server started on port ${port} at ${new Date()}`);
	});
}

start();
