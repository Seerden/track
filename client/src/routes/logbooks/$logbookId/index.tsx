import LogbookCard from "@/components/logbooks/Logbooks/LogbookCard";
import { Protected } from "@/components/wrappers";
import Page from "@/lib/theme/snippets/page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/logbooks/$logbookId/")({
	component: RouteComponent
});

function RouteComponent() {
	return (
		<Protected>
			<Page>
				{/* TODO: this should not be logbookcard, but detailedlogbook, which doesn't exist yet */}
				<LogbookCard />
			</Page>
		</Protected>
	);
}
