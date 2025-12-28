import { createFileRoute } from "@tanstack/react-router";
import NewNote from "@/components/notes/NewNote/NewNote";
import { Protected } from "@/components/wrappers";

export const Route = createFileRoute("/_authenticated/notes/new")({
	component: NewNotePage,
});

function NewNotePage() {
	return (
		<Protected>
			<NewNote />
		</Protected>
	)
}
