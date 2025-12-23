import { TextInput } from "@mantine/core";
import type { NewTag } from "@shared/lib/schemas/tag";
import TagBranch from "@/components/tags/DetailedTag/TagBranch";
import type { ModalId } from "@/lib/modal-ids";
import Buttons from "@/lib/theme/components/buttons";
import Form from "@/lib/theme/components/form.style";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import { TAG_SELECTOR_IDS } from "../TagSelector/constants";
import TagSelector from "../TagSelector/TagSelector";
import S from "./style/NewTag.style";
import useNewTag from "./useNewTag";

export default function TagForm({ modalId }: { modalId: ModalId }) {
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
						name={"name" satisfies keyof NewTag}
						onChange={handleInputChange}
					/>
					<TextInput
						label="Description"
						placeholder="Tag description"
						type="text"
						name={"description" satisfies keyof NewTag}
						onChange={handleInputChange}
					/>
				</Form.Row>

				{!!tags?.size && (
					<S.Tags>
						<TagSelector
							tagSelectorId={TAG_SELECTOR_IDS.NEW_TAG}
							title="Categorize"
							maximum={1}
							tags={tags}
							modalId={modalId}
						/>
					</S.Tags>
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
					disabled={!isValidNewTag}
				>
					Create tag
				</Buttons.Submit.Default>
			</Form.Form>
		</Form.Wrapper>
	);
}
