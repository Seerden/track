import type { NoteWithIds } from "@type/server/note.types";
import type { TagWithIds } from "@type/server/tag.types";
import TagCard from "../TagCard/TagCard";
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
