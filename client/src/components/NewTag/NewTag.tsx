import useTagsQuery from "../../lib/use-tags-query";
import TagSelector from "../TagSelector/TagSelector";
import * as S from "./NewTag.style";
import useNewTag from "./use-new-tag";

function NewTag() {
	const { onInputChange, onSubmit } = useNewTag();
	const { data: tags } = useTagsQuery(); // TODO: this should be inside useNewTag

	return (
		<S.Form onSubmit={onSubmit}>
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

				<S.Tags>
					<TagSelector title="Categorize" maximum={1} tagsById={tags?.tagsById} />
				</S.Tags>
				<S.Button title="Save">💾</S.Button>
			</S.Fields>
		</S.Form>
	);
}

export default NewTag;
