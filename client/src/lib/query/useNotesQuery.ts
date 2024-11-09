import type { DataById } from "@/types/query.types";
import { useQuery } from "@tanstack/react-query";
import type { NoteWithIds } from "@type/server/note.types";
import { makeAuthorizedUrl } from "../fetch/make-authorized-url";
import { defaultQueryConfig } from "../query-client";

async function getNotes() {
	const url = makeAuthorizedUrl("/data/notes");
	const response = await fetch(url, {
		credentials: "include",
		method: "GET"
	});

	return response.json();
}

type NotesData = DataById<NoteWithIds>;

export default function useNotesQuery() {
	return useQuery<NotesData>({
		queryKey: ["notes"],
		queryFn: getNotes,
		...defaultQueryConfig
	});
}
