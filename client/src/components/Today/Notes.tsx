import Empty from "@/components/Today/Empty";
import { createDate } from "@/lib/datetime/make-date";
import { filterTagsById } from "@/lib/filter-tags";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import { trpc } from "@/lib/trpc";
import { isToday } from "@lib/datetime/compare";
import { byIdAsList } from "@shared/lib/map";
import { useQuery } from "@tanstack/react-query";
import { Note } from "./Note";
import S from "./style/Today.style";

export default function Notes() {
	const { data: notesData } = useQuery(trpc.notes.all.queryOptions());
	const { data: tagsData } = useQuery(trpc.tags.all.queryOptions());
	const { openModal } = useModalState();

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
			{!notes.length && (
				<Empty action={() => openModal(modalIds.notes.new)}>
					<span>No notes found for today.</span>
				</Empty>
			)}
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
