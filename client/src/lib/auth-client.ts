import type { auth } from "@server/auth";
import {
	adminClient,
	inferAdditionalFields,
	usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	basePath: "/api/auth",
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
