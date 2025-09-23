import { createRootRouteWithContext, redirect } from "@tanstack/react-router";
import App from "@/App";
import { queryClient } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";

type RouterContext = {
	queryClient: typeof queryClient;
	trpc: typeof trpc;
};

export const Route = createRootRouteWithContext<RouterContext>()({
	component: App,
	beforeLoad: async ({ context: { queryClient }, location }) => {
		const me = await queryClient.ensureQueryData(trpc.auth.me.queryOptions());
		if (!me.user && location.pathname !== "/login") {
			throw redirect({ to: "/login" });
		}
	},
	head: (_ctx) => {
		return {
			meta: [{ title: "Home" }],
		};
	},

	context: () => {
		return {
			queryClient,
			trpc,
		};
	},
});
