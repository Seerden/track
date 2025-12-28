import { createFileRoute } from "@tanstack/react-router";
import Login from "@/components/auth/Login/Login";

export const Route = createFileRoute("/auth/login")({
	component: Login,
	beforeLoad: async ({ context: { queryClient } }) => {
		queryClient.resetQueries();
	},
	head: (_ctx) => ({
		meta: [{ title: "Login" }],
	}),
});
