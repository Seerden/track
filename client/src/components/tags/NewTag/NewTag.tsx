import type { ModalId } from "@/lib/modal-ids";
import F from "@/lib/theme/components/form.style";
import DefaultInput from "@/lib/theme/components/input/DefaultInput.style";
import { LucideTag } from "lucide-react";
import TagSelector from "../TagSelector/TagSelector";
import S from "./style/NewTag.style";
import useNewTag from "./useNewTag";

type NewTagProps = {
	modalId: ModalId;
};

function NewTag({ modalId }: NewTagProps) {
	const { onInputChange, onSubmit, tagsData } = useNewTag();
	const tagIds = tagsData ? [...tagsData.byId.keys()] : [];

	return (
		<F.Wrapper role="form">
			<F.Form>
				<F.FormTitle>
					New <LucideTag />
				</F.FormTitle>

				<F.Row>
					<F.Label>
						<span>Name</span>
						<DefaultInput
							type="text"
							placeholder="Tag name"
							name="name"
							onChange={onInputChange}
						/>
					</F.Label>

					<F.Label>
						<span>Description</span>
						<DefaultInput
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
								tagsById={tagsData?.byId}
								modalId={modalId}
							/>
						</S.Tags>
					)}
				</F.Row>
				<F.Button type="submit" title="Save" onClick={onSubmit}>
					💾
				</F.Button>
			</F.Form>
		</F.Wrapper>
	);
}

export default NewTag;
