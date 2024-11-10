import F from "@/lib/theme/components/form.style";
import TagSelector from "../TagSelector/TagSelector";
import * as S from "./NewTag.style";
import useNewTag from "./useNewTag";

type NewTagProps = {
	modalId: string;
};

function NewTag({ modalId }: NewTagProps) {
	const { onInputChange, onSubmit, tags } = useNewTag();

	return (
		<F.Wrapper role="form">
			<F.Form>
				<F.FormTitle>New🏷️</F.FormTitle>

				<F.Row>
					<F.Label>
						<span>Name</span>
						<input
							type="text"
							placeholder="Tag name"
							name="name"
							onChange={onInputChange}
						/>
					</F.Label>

					<F.Label>
						<span>Description</span>
						<input
							placeholder="Tag description"
							type="text"
							name="description"
							onChange={onInputChange}
						/>
					</F.Label>
				</F.Row>
				<F.Row>
					{Object.keys(tags?.byId ?? {}).length > 0 && (
						<S.Tags>
							<TagSelector
								title="Categorize"
								maximum={1}
								tagsById={tags?.byId}
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
