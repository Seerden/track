import useNotesQuery from "@/lib/query/useNotesQuery";
import useTagsQuery from "@/lib/query/useTagsQuery";

export default function useNotes() {
	const { data: notes } = useNotesQuery();
	const { data: tags } = useTagsQuery();

	return {
		notes,
		tags
	};
}
