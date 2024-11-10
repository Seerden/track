import TagSelector from "../TagSelector/TagSelector";
import * as S from "./NewTag.style";
import useNewTag from "./useNewTag";

type NewTagProps = {
	modalId: string;
};

function NewTag({ modalId }: NewTagProps) {
	const { onInputChange, onSubmit, tags } = useNewTag();

	return (
		<S.Form role="form">
			<h1>New 🏷️</h1>

			<S.Fields>
				<S.Field>
					Name
					<input
						type="text"
						placeholder="Tag name"
						name="name"
						onChange={onInputChange}
					/>
				</S.Field>

				<S.Field>
					Description
					<input
						placeholder="Tag description"
						type="text"
						name="description"
						onChange={onInputChange}
					/>
				</S.Field>

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
				<S.Button type="submit" title="Save" onClick={onSubmit}>
					💾
				</S.Button>
			</S.Fields>
		</S.Form>
	);
}

export default NewTag;
