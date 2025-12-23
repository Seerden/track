import { TextInput } from "@mantine/core";
import TagBranch from "@/components/tags/DetailedTag/TagBranch";
import type { ModalId } from "@/lib/modal-ids";
import Buttons from "@/lib/theme/components/buttons";
import Form from "@/lib/theme/components/form.style";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import { TAG_SELECTOR_IDS } from "../TagSelector/constants";
import TagSelector from "../TagSelector/TagSelector";
import S from "./style/NewTag.style";
import useNewTag from "./useNewTag";

function NewTag({ modalId }: { modalId: ModalId }) {
	const { handleInputChange, handleSubmit, tags, isValidNewTag, previewTags } =
		useNewTag({
			tagSelectorId: TAG_SELECTOR_IDS.NEW_TAG,
		});

	return (
		<Form.Wrapper role="form">
			<Form.Form>
				<Form.FormTitle
					style={{
						alignItems: "center",
						gap: spacingValue.small,
					}}
				>
					Create tag
				</Form.FormTitle>

				<Form.Row>
					<TextInput
						label="Name"
						type="text"
						placeholder="Tag name"
						name="name"
						onChange={handleInputChange}
					/>
					<TextInput
						label="Description"
						placeholder="Tag description"
						type="text"
						name="description"
						onChange={handleInputChange}
					/>
				</Form.Row>

				{!!tags?.size && (
					<S.Tags>
						{/* TODO: remove the min-height of this thing, at least for this 
                     use-case. Maybe we want it to remain for ActivityForm, but in 
                     here, it looks bad. */}
						<TagSelector
							tagSelectorId={TAG_SELECTOR_IDS.NEW_TAG}
							title="Categorize"
							maximum={1}
							tags={tags}
							modalId={modalId}
						/>
					</S.Tags>
				)}
				<Buttons.Submit.Default
					type="submit"
					title="Save"
					onClick={handleSubmit}
					disabled={!isValidNewTag}
				>
					Create tag
				</Buttons.Submit.Default>
			</Form.Form>

			{!!previewTags?.size && (
				<TagBranch tags={previewTags} tag={previewTags.get("preview")} />
			)}
		</Form.Wrapper>
	);
}

export default NewTag;
