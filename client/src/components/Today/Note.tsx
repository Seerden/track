import { filterTagsById } from "@lib/filter-tags";
import type { NoteWithIds } from "@type/server/note.types";
import type { TagWithIds } from "@type/server/tag.types";
import type { ById } from "@type/server/utility.types";
import TagCard from "../TagCard/TagCard";
import N from "./Notes.style";
import T from "./Tasks.style";

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
			{/* TODO: T.Tags should be in Today if we're reusing them */}
			<T.Tags>
				{tags.map((tag) => (
					<TagCard key={tag.tag_id} tag={tag} />
				))}
			</T.Tags>
		</N.Note>
	);
}
