import Logbooks from "@/components/logbooks/Logbooks/Logbooks";
import { Protected } from "@/components/wrappers";
import Page from "@/lib/theme/snippets/page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/logbooks/")({
	component: RouteComponent
});

function RouteComponent() {
	return (
		<Protected>
			<Page>
				<Logbooks />
			</Page>
		</Protected>
	);
}
