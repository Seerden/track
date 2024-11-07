import Empty from "@/components/Today/Empty";
import { filterTagsById } from "@/lib/filter-tags";
import useNotesQuery from "@/lib/query/useNotesQuery";
import useTagsQuery from "@/lib/query/useTagsQuery";
import { isToday } from "@lib/datetime/compare";
import { Note } from "./Note";
import S from "./style/Today.style";

export default function Notes() {
	const { data: notesData } = useNotesQuery();
	const { data: tags } = useTagsQuery();

	const notes = Object.values(notesData?.notesById ?? {}).filter((note) =>
		// TODO: note.date is not a field in the client when creating a new note,
		// so it will always be undefined currently, so using created_at is a
		// temporary solution.
		isToday(note.date ?? note.created_at)
	);
	return (
		<S.NotesWrapper>
			<S.BlockTitle>Notes</S.BlockTitle>
			{!notes.length && <Empty>No notes found for today.</Empty>}
			{notes.map((n) => (
				<Note
					key={n.note_id}
					note={n}
					tags={filterTagsById(n.tag_ids, tags?.tagsById)}
				/>
			))}
		</S.NotesWrapper>
	);
}
