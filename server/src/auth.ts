import { betterAuth } from "better-auth";
import { admin, username } from "better-auth/plugins";
import { PostgresJSDialect } from "kysely-postgres-js";
import { authSqlConnection } from "@/db/init";
import { emailFrom, sendEmail } from "@/lib/email/send-email";

const baseUrl =
	process.env.NODE_ENV === "production"
		? `https://${process.env.DOMAIN}`
		: "http://localhost:5175";

export const auth = betterAuth({
	secret: process.env.BETTER_AUTH_SECRET,
	basePath: "/api/auth",
	database: new PostgresJSDialect({
		postgres: authSqlConnection,
	}),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		sendResetPassword: async ({ token, user }, request) => {
			const url = new URL(`${baseUrl}/auth/reset-password`);
			url.searchParams.append("token", token);
			await sendEmail({
				payload: {
					from: emailFrom,
					to: user.email,
					subject: "Reset your Track password",
					html: `
                  <h1>Reset your Track password</h1>
                  
                  <p>
                     Click the following link to reset your password. The link is valid for one hour.
                  </p>
                  
                  <a href="${url}">${url}</a>

                  <p>
                     If you didn't attempt to reset your password, you can ignore this email.
                  </p>
                  
               `,
				},
			});
		},
		revokeSessionsOnPasswordReset: true,
		onPasswordReset: async ({ user }) => {
			console.log({ message: "User reset their password", user });
		},
	},
	emailVerification: {
		autoSignInAfterVerification: true,
		sendOnSignUp: true,
		sendVerificationEmail: async ({ token, user }) => {
			if (user.emailVerified) return;

			const url = new URL(`${baseUrl}/auth/verify-email/`);
			url.searchParams.append("token", token);

			await sendEmail({
				payload: {
					to: user.email,
					subject: "Verify your email address",
					html: `
               <h1>Verify your Track email address</h1>
               
               <p>
                  Click the following link to verify your email address.
               </p>
               
               <a href="${url}">${url}</a>

               <p>
                  If you did not attempt to sign up, you can ignore this email.
               </p>
            `,
					from: emailFrom,
				},
			});
			return;
		},
	},
	plugins: [admin(), username()],
	trustedOrigins: [baseUrl],
	advanced: {
		database: {
			// @see https://github.com/better-auth/better-auth/pull/5809
			generateId: "serial",
		},
		cookiePrefix: "track-auth",
		// TODO: make all of this production-aware
		useSecureCookies: process.env.NODE_ENV === "production",
		defaultCookieAttributes: {
			sameSite: "Lax",
			secure: process.env.NODE_ENV === "production",
		},
	},
});
