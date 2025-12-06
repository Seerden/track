import { createFileRoute } from "@tanstack/react-router";
import RegisterBetterAuth from "@/components/auth/Register/RegisterBetterAuth";

export const Route = createFileRoute("/register")({
	component: RegisterBetterAuth,
});
