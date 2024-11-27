import api from "@/lib/fetch/api";
import { mk } from "@/lib/query-keys";
import type { NoteInput, NoteWithIds } from "@t/data/note.types";
import { useMutation } from "@tanstack/react-query";

async function postNote(input: NoteInput) {
	return api.post<NoteInput, NoteWithIds>({ url: "/data/note", body: input });
}

export function useNewNoteMutation() {
	return useMutation<NoteWithIds, unknown, NoteInput>({
		async mutationFn({ note, tagIds }) {
			return postNote({ note, tagIds });
		},
		mutationKey: mk.notes.new
	});
}
