import { z } from "@shared/lib/zod";
import { createFileRoute } from "@tanstack/react-router";
import ActivityForm from "@/components/activities/ActivityForm/ActivityForm";
import { Protected } from "@/components/wrappers";
import Page from "@/lib/framer/components/Page";

export const Route = createFileRoute("/_authenticated/activities/new")({
	validateSearch: z.object({ task: z.boolean().optional() }).optional(),
	component: ActivityFormPage,
});

function ActivityFormPage() {
	return (
		<Protected>
			<Page>
				<ActivityForm />
			</Page>
		</Protected>
	)
}
