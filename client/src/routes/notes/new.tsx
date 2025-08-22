import { createFileRoute } from "@tanstack/react-router";
import NewNote from "@/components/notes/NewNote/NewNote";
import { Protected } from "@/components/wrappers";

export const Route = createFileRoute("/notes/new")({
	component: NewNotePage,
});

function NewNotePage() {
	return (
		<Protected>
			<NewNote />
		</Protected>
	);
}
