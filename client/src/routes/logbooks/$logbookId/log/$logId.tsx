import LogDetail from "@/components/logbooks/LogDetail/LogDetail";
import { Protected } from "@/components/wrappers";
import Page from "@/lib/theme/snippets/page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/logbooks/$logbookId/log/$logId")({
	component: RouteComponent
});

function RouteComponent() {
	return (
		<Protected>
			<Page>
				<LogDetail />
			</Page>
		</Protected>
	);
}
