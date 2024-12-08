import api from "@/lib/fetch/api";
import type { NotesData } from "@/types/data.types";
import type { NoteInput, NoteWithIds } from "@t/data/note.types";

async function getNotes() {
	return api.get<NotesData>({ url: "/data/notes" });
}

async function postNote(input: NoteInput) {
	return api.post<NoteInput, NoteWithIds>({ url: "/data/note", body: input });
}

const noteService = {
	getByUser: getNotes,
	post: postNote
};

export default noteService;
