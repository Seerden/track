import { LucideTag } from "lucide-react";
import type { ModalId } from "@/lib/modal-ids";
import Buttons from "@/lib/theme/components/buttons";
import F from "@/lib/theme/components/form.style";
import Input from "@/lib/theme/input";
import TagSelector from "../TagSelector/TagSelector";
import S from "./style/NewTag.style";
import useNewTag from "./useNewTag";

type NewTagProps = {
	modalId: ModalId;
};

function NewTag({ modalId }: NewTagProps) {
	const { onInputChange, onSubmit, tags } = useNewTag();
	const tagIds = tags ? [...tags.keys()] : [];

	return (
		<F.Wrapper role="form">
			<F.Form>
				<F.FormTitle>
					New <LucideTag />
				</F.FormTitle>

				<F.Row>
					<F.Label>
						<span>Name</span>
						<Input.Default
							type="text"
							placeholder="Tag name"
							name="name"
							onChange={onInputChange}
						/>
					</F.Label>

					<F.Label>
						<span>Description</span>
						<Input.Default
							placeholder="Tag description"
							type="text"
							name="description"
							onChange={onInputChange}
						/>
					</F.Label>
				</F.Row>
				<F.Row>
					{tagIds.length > 0 && (
						<S.Tags>
							<TagSelector
								title="Categorize"
								maximum={1}
								tags={tags}
								modalId={modalId}
							/>
						</S.Tags>
					)}
				</F.Row>
				<Buttons.Submit.Default type="submit" title="Save" onClick={onSubmit}>
					💾
				</Buttons.Submit.Default>
			</F.Form>
		</F.Wrapper>
	);
}

export default NewTag;
