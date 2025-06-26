import LogForm from "@/components/logbooks/LogForm/LogForm";
import { Protected } from "@/components/wrappers";
import Page from "@/lib/theme/snippets/page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/logbooks/$logbookId/log/")({
	component: RouteComponent
});

function RouteComponent() {
	return (
		<Protected>
			<Page>
				<LogForm />
			</Page>
		</Protected>
	);
}
