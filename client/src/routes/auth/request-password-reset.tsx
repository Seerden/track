import { createFileRoute } from "@tanstack/react-router";
import RequestPasswordReset from "@/components/auth/RequestPasswordReset";

export const Route = createFileRoute("/auth/request-password-reset")({
	component: RequestPasswordReset,
});
