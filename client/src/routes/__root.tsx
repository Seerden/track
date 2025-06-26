import App from "@/App";
import { queryClient } from "@/lib/query-client";
import { createRootRouteWithContext } from "@tanstack/react-router";

// TODO
type RouterContext = {
	queryClient: typeof queryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
	component: App,
	context: () => {
		return {
			queryClient
		};
	}
});
