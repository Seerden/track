import Empty from "@/components/Today/Empty";
import { createDate } from "@/lib/datetime/make-date";
import { filterTagsById } from "@/lib/filter-tags";
import useQueryNotes from "@/lib/hooks/query/notes/useQueryNotes";
import useQueryTags from "@/lib/hooks/query/tags/useQueryTags";
import { isToday } from "@lib/datetime/compare";
import { Note } from "./Note";
import S from "./style/Today.style";

export default function Notes() {
	const { data: notesData } = useQueryNotes();
	const { data: tags } = useQueryTags();

	const notes = Object.values(notesData?.byId ?? {}).filter((note) =>
		// TODO: note.date is not a field in the client when creating a new note,
		// so it will always be undefined currently, so using created_at is a
		// temporary solution.
		isToday(note.date ? createDate(note.date) : createDate(note.created_at))
	);
	return (
		<S.NotesWrapper>
			{/* need list style for padding, like tasks */}
			<S.BlockTitle>Notes</S.BlockTitle>
			{!notes.length && <Empty>No notes found for today.</Empty>}
			{notes.map((n) => (
				<Note key={n.note_id} note={n} tags={filterTagsById(n.tag_ids, tags?.byId)} />
			))}
		</S.NotesWrapper>
	);
}
