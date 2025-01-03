import type { NoteWithIds } from "@shared/types/data/note.types";
import type { TagWithIds } from "@shared/types/data/tag.types";
import TagCard from "../tags/TagCard/TagCard";
import N from "./style/Notes.style";
import S from "./style/Today.style";

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
				<S.Tags>
					{tags.map((t) => (
						<TagCard key={t.tag_id} tag={t} />
					))}
				</S.Tags>
			)}
		</N.Note>
	);
}
