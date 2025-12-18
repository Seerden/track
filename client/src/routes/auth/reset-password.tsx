import { z } from "@shared/lib/zod";
import { createFileRoute } from "@tanstack/react-router";
import ResetPassword from "@/components/auth/ResetPassword";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/auth/reset-password")({
	component: ResetPassword,
	validateSearch: (search) => z.object({ token: z.string() }).parse(search),
	loader: async ({ context }) => {
		await authClient.signOut();
		await context.queryClient.invalidateQueries({
			queryKey: context.trpc.user.pathKey(),
		});
	},
});
