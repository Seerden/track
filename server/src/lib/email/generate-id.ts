export function generateEntityId() {
	const id = Math.random().toString(36);

	return {
		"X-Entity-Ref-ID": id,
	};
}
