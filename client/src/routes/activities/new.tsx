import ActivityForm from "@/components/activities/ActivityForm/ActivityForm";
import { Protected } from "@/components/wrappers";
import Page from "@/lib/framer/components/Page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/activities/new")({
	component: ActivityFormPage
});

function ActivityFormPage() {
	return (
		<Protected>
			<Page>
				<ActivityForm />
			</Page>
		</Protected>
	);
}
