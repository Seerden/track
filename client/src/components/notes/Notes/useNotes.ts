import useNotesQuery from "@/lib/hooks/query/notes/useNotesQuery";
import useTagsQuery from "@/lib/hooks/query/tags/useTagsQuery";

export default function useNotes() {
	const { data: notes } = useNotesQuery();
	const { data: tags } = useTagsQuery();

	return {
		notes,
		tags
	};
}
