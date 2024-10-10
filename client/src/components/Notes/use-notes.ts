import useNotesQuery from "@lib/query/use-notes-query";
import useTagsQuery from "@lib/query/use-tags-query";

export default function useNotes() {
	const { data: notes } = useNotesQuery();
	const { data: tags } = useTagsQuery();

	return {
		notes,
		tags,
	};
}
