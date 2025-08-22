import { createFileRoute } from "@tanstack/react-router";
import Login from "@/components/auth/Login/Login";

export const Route = createFileRoute("/login")({
	component: Login,
	head: (ctx) => ({
		meta: [{ title: "Login" }]
	})
});
