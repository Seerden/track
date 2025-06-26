import LogbookForm from "@/components/logbooks/LogbookForm/LogbookForm";
import Page from "@/lib/theme/snippets/page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/logbooks/new")({
	component: RouteComponent
});

function RouteComponent() {
	return (
		<Page>
			<LogbookForm />
		</Page>
	);
}
