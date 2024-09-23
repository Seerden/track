import { formatDate } from "../../lib/format-date";
import type { TagsData } from "../../types/data.types";
import type { NoteWithIds } from "../../types/server/note.types";
import * as S from "./Notes.style";
import useNotes from "./use-notes";

function makeNoteTitle(note: NoteWithIds) {
	return note.title?.length ? note.title : formatDate(note.created_at);
}

function NoteElement({ note, tags }: { note: NoteWithIds; tags?: TagsData }) {
	const title = makeNoteTitle(note);

	return (
		<S.Note key={note.note_id}>
			<S.NoteHeader>
				<S.Title>{title}</S.Title>
				<S.Tags>
					{note.tag_ids?.map((id) => (
						<S.Tag key={id}>{tags?.tagsById?.[id]?.name}</S.Tag>
					))}
				</S.Tags>
			</S.NoteHeader>
			<p>{note.content}</p>
		</S.Note>
	);
}

export default function Notes() {
	const { notes, tags } = useNotes();

	if (!notes?.notesById) {
		return <></>;
	}

	return (
		<S.Page>
			<h1>My notes 📔</h1>

			<S.List>
				{Object.values(notes.notesById).map((note) => (
					<NoteElement key={note.note_id} note={note} tags={tags} />
				))}
			</S.List>
		</S.Page>
	);
}
