import { z } from "@shared/lib/zod";
import { createFileRoute } from "@tanstack/react-router";
import ResetPassword from "@/components/auth/ResetPassword";

// TODO: implementation

export const Route = createFileRoute("/auth/reset-password")({
	component: ResetPassword,
	validateSearch: (search) => z.object({ token: z.string() }).parse(search),
});
