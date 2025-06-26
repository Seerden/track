import Login from "@/components/auth/Login/Login";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
	component: Login
});
