import useNotesQuery from "@/lib/query/notes/useNotesQuery";
import useTagsQuery from "@/lib/query/tags/useTagsQuery";

export default function useNotes() {
	const { data: notes } = useNotesQuery();
	const { data: tags } = useTagsQuery();

	return {
		notes,
		tags
	};
}
