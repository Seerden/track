import { LucideTags } from "lucide-react";
import type { ModalId } from "@/lib/modal-ids";
import Buttons from "@/lib/theme/components/buttons";
import F from "@/lib/theme/components/form.style";
import Input from "@/lib/theme/input";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import { TAG_SELECTOR_IDS } from "../TagSelector/constants";
import TagSelector from "../TagSelector/TagSelector";
import S from "./style/NewTag.style";
import useNewTag from "./useNewTag";

function NewTag({ modalId }: { modalId: ModalId }) {
	const { handleInputChange, handleSubmit, tags } = useNewTag({
		tagSelectorId: TAG_SELECTOR_IDS.NEW_TAG,
	});
	const tagIds = tags ? [...tags.keys()] : [];

	return (
		<F.Wrapper role="form">
			<F.Form>
				<F.FormTitle
					style={{
						alignItems: "center",
						gap: spacingValue.small,
					}}
				>
					New
					<LucideTags />
				</F.FormTitle>

				<F.Row>
					<F.Label>
						<span>Name</span>
						<Input.Default
							type="text"
							placeholder="Tag name"
							name="name"
							onChange={handleInputChange}
						/>
					</F.Label>

					<F.Label>
						<span>Description</span>
						<Input.Default
							placeholder="Tag description"
							type="text"
							name="description"
							onChange={handleInputChange}
						/>
					</F.Label>
				</F.Row>
				<F.Row>
					{tagIds.length > 0 && (
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
				</F.Row>
				<Buttons.Submit.Default
					type="submit"
					title="Save"
					onClick={handleSubmit}
				>
					💾
				</Buttons.Submit.Default>
			</F.Form>
		</F.Wrapper>
	);
}

export default NewTag;
