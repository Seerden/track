import modalIds from "@/lib/modal-ids";
import F from "@/lib/theme/components/form.style";
import TagSelector from "../TagSelector/TagSelector";
import useNewNote from "./useNewNote";

type NewNoteProps = {
	inActivity?: boolean;
};

function NewNote({ inActivity }: NewNoteProps) {
	const { onInputChange, onSubmit, tagsData } = useNewNote({ inActivity });

	const tagsById = tagsData?.byId;

	return (
		<F.Wrapper>
			<F.FormTitle> Take a note</F.FormTitle>
			<F.Form onSubmit={onSubmit}>
				<F.Row>
					<F.Label>
						<span>Title</span>
						<input
							type="text"
							name="title"
							placeholder="Scruffy's meals"
							onChange={onInputChange}
						/>
					</F.Label>
				</F.Row>
				<F.Row>
					<F.Label>
						<span>Content</span>
						<textarea
							name="content"
							placeholder="I accidentally fed Scruffy twice today."
							onChange={onInputChange}
						/>
					</F.Label>
				</F.Row>
				<F.Row>
					<TagSelector
						title="Tags"
						tagsById={tagsById}
						showNewTagButton
						modalId={modalIds.tagSelector.newNote}
					/>
				</F.Row>
				<F.Button type="submit">Create note</F.Button>
			</F.Form>
		</F.Wrapper>
	);
}

export default NewNote;
