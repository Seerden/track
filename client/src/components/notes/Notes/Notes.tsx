import { formatDate } from "@lib/datetime/format-date";
import type { NoteWithIds } from "@t/data/note.types";
import type { TagsData } from "@type/data.types";
import S from "./style/Notes.style";
import useNotes from "./useNotes";

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
						// TODO: use a helper function to get the tag
						<S.Tag key={id}>{tags?.byId?.[id]?.name}</S.Tag>
					))}
				</S.Tags>
			</S.NoteHeader>
			<p>{note.content}</p>
		</S.Note>
	);
}

export default function Notes() {
	const { notes, tags } = useNotes();

	if (!notes?.byId) return <></>;

	return (
		<S.Page>
			<h1>My notes 📔</h1>

			<S.List>
				{Object.values(notes.byId).map((note) => (
					<NoteElement key={note.note_id} note={note} tags={tags} />
				))}
			</S.List>
		</S.Page>
	);
}
