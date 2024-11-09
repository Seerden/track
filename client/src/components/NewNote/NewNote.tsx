import modalIds from "@/lib/modal-ids";
import TagSelector from "../TagSelector/TagSelector";
import * as S from "./NewNote.style";
import useNewNote from "./useNewNote";

type NewNoteProps = {
	inActivity?: boolean;
};

function NewNote({ inActivity }: NewNoteProps) {
	const { onInputChange, onSubmit, tagsData } = useNewNote({ inActivity });

	const tagsById = tagsData?.byId;

	return (
		<S.Wrapper>
			<S.Title> Take a note</S.Title>
			<S.Form onSubmit={onSubmit}>
				<S.MainFields>
					<S.Field>
						<S.Label>Title</S.Label>
						<S.Input
							type="text"
							name="title"
							placeholder="Scruffy's meals"
							onChange={onInputChange}
						/>
					</S.Field>
					<S.Field>
						<TagSelector
							title="Tags"
							tagsById={tagsById}
							showNewTagButton
							modalId={modalIds.tagSelector.newNote}
						/>
					</S.Field>
				</S.MainFields>
				<S.Content>
					<div>
						<S.Label>Content</S.Label>
						{/* TODO: this does not take tabs and newlines etc */}
						<S.TextArea
							name="content"
							placeholder="I accidentally fed Scruffy twice today."
							onChange={onInputChange}
						/>
					</div>
				</S.Content>
				<S.Button type="submit">💾</S.Button>
			</S.Form>
		</S.Wrapper>
	);
}

export default NewNote;
