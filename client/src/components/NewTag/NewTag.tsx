import * as S from "./NewTag.style";

function NewTag() {
	return (
		<S.Form>
			<h1>New 🏷️</h1>

			<S.Fields>
				<S.Field>
					Name
					<input type="text" placeholder="Tag name" />
				</S.Field>

				<S.Field>
					Description
					<input placeholder="Tag description" />
				</S.Field>
				<S.Button title="Save">💾</S.Button>
			</S.Fields>
		</S.Form>
	);
}

export default NewTag;
