import RedisStore from "connect-redis";
import type session from "express-session";
import Redis from "ioredis";

// NOTE: `store` is the name of our redis service in docker-compose, and 6379 is
// the default port, which we haven't changed.
// NOTE: we run the client in containers, too, so we don't need to have a switch
// here that checks for environment (if we ran client/server outside of
// containers, we'd need to use localhost here).
export const redisClient = new Redis(
	`redis://${process.env.REDIS_PASS}@store:6379`
);

export const sessionCookieName = "track-session";

export const redisSession: session.SessionOptions = {
	store: new RedisStore({ client: redisClient }),
	name: sessionCookieName,
	saveUninitialized: false,
	/**
	 * necessary for production (with nginx and https)
	 * @see https://stackoverflow.com/questions/44039069/express-session-secure-cookies-not-working */
	proxy: process.env.NODE_ENV === "production",
	// biome-ignore lint/style/noNonNullAssertion: should exist
	secret: process.env.SESSION_SECRET!,
	resave: false,
	rolling: true,
	cookie: {
		domain:
			process.env.NODE_ENV === "production" ? "track.seerden.dev" : "localhost",
		httpOnly: true,
		maxAge: 7 * 24 * 3600 * 1000, // One week.
		secure: process.env.NODE_ENV === "production",
	},
};

export async function initializeRedisConnection() {
	try {
		const ping = await redisClient.ping();
		if (ping !== "PONG") {
			await redisClient.connect();
		}
	} catch (error) {
		console.log({ error, message: "Error connecting to Redis client" });
	}
}
