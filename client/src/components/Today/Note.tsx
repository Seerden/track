import { filterTagsById } from "@lib/filter-tags";
import type { NoteWithIds } from "@type/server/note.types";
import type { TagWithIds } from "@type/server/tag.types";
import type { ById } from "@type/server/utility.types";
import TagCard from "../TagCard/TagCard";
import T from "./Tasks.style";
import S from "./Today.style";

type NoteProps = {
	note: NoteWithIds;
	tagsById?: ById<TagWithIds>;
};

export function Note({ note, tagsById }: NoteProps) {
	const tags = filterTagsById(note.tag_ids ?? [], tagsById);

	return (
		<S.Note>
			{note.title?.length && <S.NoteTitle>{note.title}</S.NoteTitle>}
			<S.NoteContent>{note.content}</S.NoteContent>
			<T.Tags>
				{tags.map((tag) => (
					<TagCard key={tag.tag_id} tag={tag} />
				))}
			</T.Tags>
		</S.Note>
	);
}
