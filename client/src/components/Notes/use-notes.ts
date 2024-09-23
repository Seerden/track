import useNotesQuery from "../../lib/use-notes-query";
import useTagsQuery from "../../lib/use-tags-query";

export default function useNotes() {
	const { data: notes } = useNotesQuery();
	const { data: tags } = useTagsQuery();

	return {
		notes,
		tags,
	};
}
