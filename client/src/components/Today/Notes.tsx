import { isToday } from "@lib/datetime/compare";
import useNotesQuery from "@lib/query/use-notes-query";
import useTagsQuery from "@lib/query/use-tags-query";
import { Note } from "./Note";
import S from "./Today.style";

export default function Notes() {
	const { data } = useNotesQuery();
	const { data: tags } = useTagsQuery();

	const notes = Object.values(data?.notesById ?? {}).filter((note) =>
		// TODO: note.date is not a field in the client when creating a new note,
		// so it will always be undefined currently. So using created_at is a
		// temporary solution.
		isToday(note.date ?? note.created_at)
	);
	return (
		<S.NotesWrapper>
			<S.BlockTitle>Notes</S.BlockTitle>
			{notes.map((note) => (
				<Note key={note.note_id} note={note} tagsById={tags?.tagsById} />
			))}
		</S.NotesWrapper>
	);
}
