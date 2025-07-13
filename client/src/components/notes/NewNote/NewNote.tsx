import TagSelector from "@/components/tags/TagSelector/TagSelector";
import modalIds from "@/lib/modal-ids";
import F from "@/lib/theme/components/form.style";
import Input from "@/lib/theme/input";
import useNewNote from "./useNewNote";

function NewNote() {
	const { onInputChange, onSubmit, tagsData } = useNewNote();

	const tagsById = tagsData?.byId;

	return (
		<F.Wrapper
			style={{
				minWidth: 500
			}}
		>
			<F.FormTitle> Take a note</F.FormTitle>
			<F.Form onSubmit={onSubmit}>
				<F.Row>
					<F.Label>
						<span>Title</span>
						<Input.Default
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
