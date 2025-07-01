import App from "@/App";
import { queryClient } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";
import { createRootRouteWithContext } from "@tanstack/react-router";

type RouterContext = {
	queryClient: typeof queryClient;
	trpc: typeof trpc;
};

export const Route = createRootRouteWithContext<RouterContext>()({
	component: App,
	context: () => {
		return {
			queryClient,
			trpc
		};
	}
});
