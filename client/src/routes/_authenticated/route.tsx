import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
	component: Outlet,
	/** @see https://tanstack.com/router/v1/docs/eslint/create-route-property-order */
	beforeLoad: async ({ context: { queryClient, trpc } }) => {
		const me = await queryClient.ensureQueryData(
			trpc.users.q.me.queryOptions()
		);

		if (!me.user) {
			throw redirect({ to: "/auth/login" });
		}

		await queryClient.ensureQueryData(
			trpc.users.q.settings.query.queryOptions()
		);

		return { user: me.user };
	},
});
