import { getNotes } from "@/lib/fetch/notes-service";
import { qk } from "@/lib/query-keys";
import type { NotesData } from "@/types/data.types";
import { defaultQueryConfig } from "@lib/query-client";
import { useQuery } from "@tanstack/react-query";

export default function useQueryNotes() {
	return useQuery<NotesData>({
		queryKey: qk.notes.all,
		queryFn: getNotes,
		...defaultQueryConfig
	});
}
