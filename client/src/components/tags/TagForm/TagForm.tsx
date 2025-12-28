import { TextInput } from "@mantine/core";
import type { NewTag, TagInTree } from "@shared/lib/schemas/tag";
import TagBranch from "@/components/tags/DetailedTag/TagBranch";
import type { ModalId } from "@/lib/modal-ids";
import Buttons from "@/lib/theme/components/buttons";
import Form from "@/lib/theme/components/form.style";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import { TAG_SELECTOR_IDS } from "../TagSelector/constants";
import TagSelector from "../TagSelector/TagSelector";
import useTagForm from "./useTagForm";

export default function TagForm({
	modalId,
	tag: existingTag,
}: {
	modalId: ModalId;
	tag?: TagInTree;
}) {
	const {
		handleInputChange,
		handleSubmit,
		tags,
		tag,
		isValidNewTag,
		isValidTag,
		previewTags,
	} = useTagForm({
		modalId,
		tagSelectorId: TAG_SELECTOR_IDS.NEW_TAG,
		tag: existingTag,
	});

	return (
		<Form.Wrapper>
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
						value={tag.name}
						name={"name" satisfies keyof NewTag}
						onChange={handleInputChange}
					/>
					<TextInput
						label="Description"
						placeholder="Tag description"
						type="text"
						value={tag.description ?? undefined}
						name={"description" satisfies keyof NewTag}
						onChange={handleInputChange}
					/>
				</Form.Row>

				{!!tags?.size && (
					<div style={{ width: "100%" }}>
						{/* TODO: implemented `disabled` functionality for tags 
                  in the selector; when editing a tag, we shouldn't be able 
                  to select it as its own parent */}
						<TagSelector
							tagSelectorId={TAG_SELECTOR_IDS.NEW_TAG}
							title="Categorize"
							maximum={1}
							tags={tags}
							modalId={modalId}
						/>
					</div>
				)}

				{!!previewTags?.size && (
					<Form.Row style={{ justifyContent: "center" }}>
						<TagBranch
							title="Preview"
							tags={previewTags}
							tag={previewTags.get("preview")}
							preview
						/>
					</Form.Row>
				)}

				<Buttons.Submit.Default
					style={{ marginBlock: spacingValue.medium }}
					type="submit"
					title="Save"
					onClick={handleSubmit}
					disabled={!isValidNewTag && !isValidTag}
				>
					Create tag
				</Buttons.Submit.Default>
			</Form.Form>
		</Form.Wrapper>
	);
}
