import TagSelector from "@/components/tags/TagSelector/TagSelector";
import { tagSelectorId } from "@/components/tags/TagSelector/useTagSelector";
import modalIds from "@/lib/modal-ids";
import Buttons from "@/lib/theme/components/buttons";
import F from "@/lib/theme/components/form.style";
import Input from "@/lib/theme/input";
import useNewNote from "./useNewNote";

function NewNote() {
	const { onInputChange, onSubmit, tags } = useNewNote();

	return (
		<F.Wrapper
			style={{
				minWidth: 500,
			}}>
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
						tagSelectorId={tagSelectorId}
						title="Tags"
						tags={tags}
						showNewTagButton
						modalId={modalIds.tagSelector.newNote}
					/>
				</F.Row>
				<Buttons.Submit.Default type="submit">
					Create note
				</Buttons.Submit.Default>
			</F.Form>
		</F.Wrapper>
	);
}

export default NewNote;
