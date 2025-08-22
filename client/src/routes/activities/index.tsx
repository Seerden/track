import ActivityOverview from "@/components/activities/ActivityOverview/ActivityOverview";
import { Protected } from "@/components/wrappers";
import Page from "@/lib/framer/components/Page";
import { createFileRoute } from "@tanstack/react-router";

function ActivityOverviewPage() {
	return (
		<Protected>
			<Page>
				<ActivityOverview />
			</Page>
		</Protected>
	);
}

export const Route = createFileRoute("/activities/")({
	component: ActivityOverviewPage,
});
