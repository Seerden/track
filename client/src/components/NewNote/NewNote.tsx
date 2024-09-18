import useTagsQuery from "../../lib/fetch/use-tags-query";
import TagSelector from "../TagSelector/TagSelector";
import * as S from "./NewNote.style";

function NewNote() {
	const { data: tags } = useTagsQuery();

	return (
		<S.Wrapper>
			<S.Title> Take a note</S.Title>
			<S.Form>
				<S.MainFields>
					<S.Field>
						<S.Label>Title</S.Label>
						<S.Input type="text" placeholder="Title" />
					</S.Field>
					<S.Field>
						<TagSelector tagsById={tags?.tagsById} oneLine />
					</S.Field>
				</S.MainFields>
				<S.Content>
					<div>
						<S.Label>Content</S.Label>
						<S.TextArea placeholder="I accidentally fed Scruffy twice today." />
					</div>
					<div>
						<S.Label>Tasks</S.Label>
						{/* TODO: this will of course not be a textarea, just doing it this way right now because it gives a good idea of the look of the layout */}
						<S.TextArea placeholder="Feed Scruffy only once." />
					</div>
				</S.Content>
				<S.Button type="submit">💾</S.Button>
			</S.Form>
		</S.Wrapper>
	);
}

export default NewNote;
