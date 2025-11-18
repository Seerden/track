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
		console.log("In __root beforeLoad");
		const me = await queryClient.ensureQueryData(trpc.auth.me.queryOptions());
		if (!me.user && !["/login", "/register"].includes(location.pathname)) {
			throw redirect({ to: "/login" });
		}
	},
	head: (_ctx) => {
		return {
			meta: [{ title: "Home" }],
			links: [
				{
					rel: "icon",
					href: "/public/favicon.ico",
					sizes: "48x48",
				},
				{
					rel: "icon",
					href: "/public/favicon.svg",
					type: "image/svg+xml",
				},
				{
					rel: "apple-touch-icon",
					href: "/public/apple-touch-icon-180x180.png",
					sizes: "180x180",
				},
			],
		};
	},

	context: () => {
		return {
			queryClient,
			trpc,
		};
	},
});
