import { filterTagsById } from "@lib/filter-tags";
import type { NoteWithIds } from "@type/server/note.types";
import type { TagWithIds } from "@type/server/tag.types";
import type { ById } from "@type/server/utility.types";
import TagCard from "../TagCard/TagCard";
import N from "./style/Notes.style";
import S from "./style/Today.style";

type NoteProps = {
	note: NoteWithIds;
	tagsById?: ById<TagWithIds>;
};

export function Note({ note, tagsById }: NoteProps) {
	const tags = filterTagsById(note.tag_ids ?? [], tagsById);

	return (
		<N.Note>
			{note.title?.length && <N.NoteTitle>{note.title}</N.NoteTitle>}
			<N.NoteContent>{note.content}</N.NoteContent>
			<S.Tags>
				{tags.map((tag) => (
					<TagCard key={tag.tag_id} tag={tag} />
				))}
			</S.Tags>
		</N.Note>
	);
}
