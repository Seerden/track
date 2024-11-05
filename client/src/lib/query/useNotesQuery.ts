import { useQuery } from "@tanstack/react-query";
import type { Data } from "@type/query.types";
import type { NoteWithIds } from "@type/server/note.types";
import type { ById } from "@type/server/utility.types";
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

type NotesData = Data<"notesById", ById<NoteWithIds>>;

export default function useNotesQuery() {
	return useQuery<NotesData>({
		queryKey: ["notes"],
		queryFn: getNotes,
		...defaultQueryConfig
	});
}
