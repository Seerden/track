import { trpc } from "@/lib/trpc";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Index,
	loader: async ({ context: { queryClient } }) => {
		const me = await queryClient.ensureQueryData(trpc.auth.me.queryOptions());
		console.log({ me });
	}
});

function Index() {
	return (
		<div className="p-2">
			<h3>Welcome Home!</h3>
		</div>
	);
}
