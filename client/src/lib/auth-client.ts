import type { auth } from "@server/auth";
import {
	adminClient,
	inferAdditionalFields,
	usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const baseURL =
	import.meta.env.MODE === "production"
		? // In production, we can't use the port; the express server on the backend
			// should handle deciding between the trpc router and serving the client bundle.
			`https://track.seerden.dev/api/auth`
		: `/api/auth`;

export const authClient = createAuthClient({
	basePath: baseURL,
	plugins: [
		adminClient(),
		usernameClient(),
		// TODO: implement this in server auth.ts if necessary
		inferAdditionalFields<typeof auth>(),
	],
});

type Session = typeof authClient.$Infer.Session;
export type AuthSession = Session["session"];
export type AuthUser = Session["user"];
