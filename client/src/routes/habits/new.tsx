import { createFileRoute } from "@tanstack/react-router";
import NewHabit from "@/components/habits/NewHabit/NewHabit";
import { Protected } from "@/components/wrappers";
import Page from "@/lib/theme/snippets/page";

export const Route = createFileRoute("/habits/new")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Protected>
			<Page>
				<NewHabit />
			</Page>
		</Protected>
	);
}
