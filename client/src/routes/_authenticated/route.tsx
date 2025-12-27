import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
	component: Outlet,
	/** @see https://tanstack.com/router/v1/docs/eslint/create-route-property-order */
	beforeLoad: async ({ context: { queryClient, trpc }, location, matches }) => {
		// TODO: this is WIP still.
		if (location.pathname.startsWith("/auth/")) {
			// don't have to do anything, we're on an unauthenticated route.
		} else {
			const me = await queryClient.ensureQueryData(
				trpc.users.q.me.queryOptions()
			);
			if (!me.user) {
				throw redirect({ to: "/auth/login" });
			}
			return { user: me.user };
		}
		return { user: null };
	},
	loader: async ({ context: { queryClient, trpc, user } }) => {
		if (user) {
			// ensure settings query was fetched, so that we can reconcile the
			// atoms derived from settings on mount without rerendering etc.
			await queryClient.ensureQueryData(
				trpc.users.q.settings.query.queryOptions()
			);
		}
	},
});
