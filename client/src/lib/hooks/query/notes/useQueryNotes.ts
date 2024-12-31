import noteService from "@/lib/fetch/notes-service";
import { qk } from "@/lib/query-keys";
import { defaultQueryConfig } from "@lib/query-client";
import { useQuery } from "@tanstack/react-query";
import { select } from "@/lib/hooks/query/select-map-by-id";

export default function useQueryNotes() {
	return useQuery({
		queryKey: qk.notes.all,
		queryFn: noteService.getByUser,
		select,
		...defaultQueryConfig
	});
}
