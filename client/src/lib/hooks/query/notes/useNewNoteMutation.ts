import { mk } from "@/lib/query-keys";
import { createRequestConfig } from "@lib/fetch/create-request-config";
import { makeAuthorizedUrl } from "@lib/fetch/make-authorized-url";
import type { NoteInput, NoteWithIds } from "@t/data/note.types";
import { useMutation } from "@tanstack/react-query";

async function postNote({ note, tagIds }: NoteInput) {
	const url = makeAuthorizedUrl("/data/note");
	return (await fetch(url, createRequestConfig.post({ note, tagIds }))).json();
}

export function useNewNoteMutation() {
	return useMutation<NoteWithIds, unknown, NoteInput>({
		async mutationFn({ note, tagIds }) {
			return postNote({ note, tagIds });
		},
		mutationKey: mk.notes.new
	});
}
