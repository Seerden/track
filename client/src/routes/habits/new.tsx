import { createFileRoute } from "@tanstack/react-router";
import HabitForm from "@/components/habits/HabitForm/HabitForm";
import { Protected } from "@/components/wrappers";
import Page from "@/lib/theme/snippets/page";

export const Route = createFileRoute("/habits/new")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Protected>
			<Page>
				<HabitForm />
			</Page>
		</Protected>
	);
}
