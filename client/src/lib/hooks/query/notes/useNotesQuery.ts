import type { NotesData } from "@/types/data.types";
import { useQuery } from "@tanstack/react-query";
import { makeAuthorizedUrl } from "../../fetch/make-authorized-url";
import { defaultQueryConfig } from "../../query-client";

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
		queryKey: ["notes"],
		queryFn: getNotes,
		...defaultQueryConfig
	});
}
