import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { PostgresJSDialect } from "kysely-postgres-js";
import { sqlConnection } from "@/db/init";

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
			return;
		},
	},
	plugins: [username()],
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
