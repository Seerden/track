import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { PostgresJSDialect } from "kysely-postgres-js";
import { sqlConnection } from "@/db/init";

// TODO: redis store?
export const auth = betterAuth({
	// TODO: production-aware
	basePath: "/api/auth",
	database: new PostgresJSDialect({
		postgres: sqlConnection,
	}),
	emailAndPassword: {
		enabled: true,
	},
	emailVerification: {
		sendVerificationEmail: async () => {
			// TODO: implement this!
			return;
		},
	},
	plugins: [username()],
	// TODO: enviroment aware (localhost in dev, VITE_DOMAIN in prod)
	trustedOrigins: ["http://localhost:5175"],
	// TODO: make this production-aware
	advanced: {
		cookiePrefix: "track-better-auth",
		useSecureCookies: process.env.NODE_ENV === "production",
		defaultCookieAttributes: {
			sameSite: "Lax",
			secure: process.env.NODE_ENV === "production",
		},
	},
});
