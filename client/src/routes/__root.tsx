import { createRootRouteWithContext, redirect } from "@tanstack/react-router";
import App from "@/App";
import { queryClient } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";

type RouterContext = {
	queryClient: typeof queryClient;
	trpc: typeof trpc;
};

export const Route = createRootRouteWithContext<RouterContext>()({
	shellComponent: App,
	beforeLoad: async ({ context: { queryClient }, location }) => {
		const me = await queryClient.ensureQueryData(trpc.auth.me.queryOptions());
		if (!me.user && !["/login", "/register"].includes(location.pathname)) {
			throw redirect({ to: "/login" });
		}
	},
	head: (_ctx) => {
		return {
			meta: [{ title: "Home" }],
			links: [
				// NOTE: if we import the mantine css files here, some things won't
				// work properly, e.g. our overwrite of the cursor in the
				// MantineProvider will not be applied, I think because of the order
				// of things (that gets set first, then the css is imported here
				// which resets it, or something).
				// { rel: "stylesheet", href: indexCss },
				// { rel: "stylesheet", href: normalizeCss },
				// { rel: "manifest", href: "/site.webmanifest", color: "#171717" },
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
