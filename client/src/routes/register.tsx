import Register from "@/components/auth/Register/Register";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
	component: Register
});
