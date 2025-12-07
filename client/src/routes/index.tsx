import { createFileRoute } from "@tanstack/react-router";
import Today from "@/components/Today/Today";

export const Route = createFileRoute("/")({
	component: Home,
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(
			context.trpc.activities.all.queryOptions()
		);
	},
});

function Home() {
	return <Today />;
}
