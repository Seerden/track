import type { NoteWithIds } from "@shared/lib/schemas/note";
import type { TagWithIds } from "@shared/lib/schemas/tag";
import TagCard from "../../tags/TagCard/TagCard";
import Today from "../style/Today.style";
import N from "./style/Notes.style";

type NoteProps = {
	note: NoteWithIds;
	tags: TagWithIds[];
};

export function Note({ note, tags }: NoteProps) {
	return (
		<N.Note>
			{!!note.title?.length && <N.NoteTitle>{note.title}</N.NoteTitle>}
			<N.NoteContent>{note.content}</N.NoteContent>
			{!!tags.length && (
				<Today.Tags>
					{tags.map((t) => (
						<TagCard key={t.tag_id} tag={t} />
					))}
				</Today.Tags>
			)}
		</N.Note>
	);
}
