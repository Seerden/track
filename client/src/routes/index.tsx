import { createFileRoute } from "@tanstack/react-router";
import Today from "@/components/Today/Today";
import { Protected } from "@/components/wrappers";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<Protected>
			<Today />
		</Protected>
	);
}
