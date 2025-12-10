import { z } from "@shared/lib/zod";
import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/auth/verify-email")({
	component: RouteComponent,
	validateSearch: (search) =>
		z
			.object({
				token: z.string(),
			})
			.parse(search),
	beforeLoad: async ({ context, search }) => {
		const { token } = search;

		const emailVerifyResponse = await authClient.verifyEmail({
			query: {
				token,
			},
		});

		if (emailVerifyResponse.data) {
			// here, we invalidate the me query, ensure it again, then redirect to
			// /today or wherever.
		}
		return { emailVerifyResponse };
	},
	loader: async ({ context }) => {
		return {
			emailVerifyResponse: context.emailVerifyResponse,
		};
	},
});

function RouteComponent() {
	return (
		<div>
			<h1>Your email address could not be verified. Try again.</h1>
		</div>
	);
}
