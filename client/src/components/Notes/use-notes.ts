import useNotesQuery from "../../lib/use-notes-query";

export default function useNotes() {
	const { data } = useNotesQuery();

	return {
		data,
	};
}
