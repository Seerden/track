import NewNote from "@/components/notes/NewNote/NewNote";
import { Protected } from "@/components/wrappers";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/notes/new")({
	component: NewNotePage
});

function NewNotePage() {
	return (
		<Protected>
			<NewNote />
		</Protected>
	);
}
