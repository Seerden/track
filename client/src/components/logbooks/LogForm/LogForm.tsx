export default function LogForm() {
	return (
		<form>
			<label>
				Name:
				<input type="text" name="name" />
			</label>

			<label>
				date:
				<input type="date" name="date" />
			</label>

			<button type="submit">Submit</button>
		</form>
	);
}
