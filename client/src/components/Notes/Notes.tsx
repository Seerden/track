import { formatDate } from "../../lib/format-date";
import useTagsQuery from "../../lib/use-tags-query";
import * as S from "./Notes.style";
import useNotes from "./use-notes";

export default function Notes() {
	const { data: notes } = useNotes();
	const { data: tags } = useTagsQuery();

	if (!notes?.notesById) {
		return <></>;
	}

	return (
		<S.Page>
			<h1>My notes 📔</h1>

			<S.List>
				{Object.values(notes.notesById).map((note) => {
					const title = note.title?.length
						? note.title
						: formatDate(note.created_at);

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
				})}
			</S.List>
		</S.Page>
	);
}
