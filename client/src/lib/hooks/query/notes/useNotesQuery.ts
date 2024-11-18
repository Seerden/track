import { qk } from "@/lib/query-keys";
import type { NotesData } from "@/types/data.types";
import { makeAuthorizedUrl } from "@lib/fetch/make-authorized-url";
import { defaultQueryConfig } from "@lib/query-client";
import { useQuery } from "@tanstack/react-query";

async function getNotes() {
	const url = makeAuthorizedUrl("/data/notes");
	const response = await fetch(url, {
		credentials: "include",
		method: "GET"
	});

	return response.json();
}

export default function useNotesQuery() {
	return useQuery<NotesData>({
		queryKey: qk.notes.all,
		queryFn: getNotes,
		...defaultQueryConfig
	});
}
