import api from "@/lib/fetch/api";
import type { NotesData } from "@/types/data.types";
import type { NoteInput, NoteWithIds } from "@t/data/note.types";

export async function getNotes() {
	return api.get<NotesData>({ url: "/data/notes" });
}

export async function postNote(input: NoteInput) {
	return api.post<NoteInput, NoteWithIds>({ url: "/data/note", body: input });
}
