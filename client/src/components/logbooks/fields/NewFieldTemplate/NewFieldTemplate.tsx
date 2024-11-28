import S from "./NewFieldTemplate.style";
export default function NewFieldTemplate() {
	return (
		// name, description, unit, value_type, required
		<S.Form
			style={{
				display: "flex"
			}}
		>
			<S.Title>new field</S.Title>

			<S.Column>
				<S.Label>
					<span>required?</span>
					<input type="checkbox" />
				</S.Label>
			</S.Column>

			<S.Column>
				<S.Label>
					<span>name</span>
					<input type="text" />
				</S.Label>

				<S.Label>
					<span>description</span>
					<input type="text" />
				</S.Label>
			</S.Column>

			<S.Column>
				<S.Label>
					<span>value type</span>
					<input type="text" />
				</S.Label>

				<S.Label>
					<span>unit (optional)</span>
					<input type="text" />
				</S.Label>
			</S.Column>
		</S.Form>
	);
}
