import Empty from "@/components/Today/Empty";
import { createDate } from "@/lib/datetime/make-date";
import { filterTagsById } from "@/lib/filter-tags";
import useQueryNotes from "@/lib/hooks/query/notes/useQueryNotes";
import { byIdAsList } from "@/lib/hooks/query/select-map-by-id";
import useQueryTags from "@/lib/hooks/query/tags/useQueryTags";
import { isToday } from "@lib/datetime/compare";
import { Note } from "./Note";
import S from "./style/Today.style";

export default function Notes() {
	const { data: notesData } = useQueryNotes();
	const { data: tagsData } = useQueryTags();

	if (!notesData || !tagsData) return null; // TODO: use isProbablySuspended

	const notes = byIdAsList(notesData.byId).filter((note) =>
		// TODO: note.date is not a field in the client when creating a new note,
		// so it will always be undefined currently, so using created_at is a
		// temporary solution.
		isToday(note.date ? createDate(note.date) : createDate(note.created_at))
	);
	return (
		<S.NotesWrapper style={{ gridArea: "notes" }}>
			{/* need list style for padding, like tasks */}
			<S.BlockTitle>Notes</S.BlockTitle>
			{!notes.length && <Empty>No notes found for today.</Empty>}
			{notes.map((n) => (
				<Note
					key={n.note_id}
					note={n}
					tags={filterTagsById(n.tag_ids, tagsData?.byId)}
				/>
			))}
		</S.NotesWrapper>
	);
}
