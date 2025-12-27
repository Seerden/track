import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: async ({ context: { queryClient, trpc } }) => {
		const me = await queryClient.ensureQueryData(
			trpc.users.q.me.queryOptions()
		);

		if (!me.user) {
			throw redirect({ to: "/login" });
		}

		return {
			user: me.user,
		};
	},
	component: Outlet,
});
