import api from "@/lib/fetch/api";
import { qk } from "@/lib/query-keys";
import type { NotesData } from "@/types/data.types";
import { defaultQueryConfig } from "@lib/query-client";
import { useQuery } from "@tanstack/react-query";

async function getNotes() {
	return api.get<NotesData>({ url: "/data/notes" });
}

export default function useNotesQuery() {
	return useQuery<NotesData>({
		queryKey: qk.notes.all,
		queryFn: getNotes,
		...defaultQueryConfig
	});
}
