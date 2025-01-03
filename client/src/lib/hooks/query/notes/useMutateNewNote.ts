import noteService from "@/lib/fetch/notes-service";
import { mk } from "@/lib/query-keys";
import type { NoteInput, NoteWithIds } from "@shared/types/data/note.types";
import { useMutation } from "@tanstack/react-query";

export function useMutateNewNote() {
	return useMutation<NoteWithIds, unknown, NoteInput>({
		async mutationFn({ note, tagIds }) {
			return noteService.post({ note, tagIds });
		},
		mutationKey: mk.notes.new
	});
}
