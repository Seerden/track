import { useMutation } from "@tanstack/react-query";
import type { NoteInput, NoteWithIds } from "@type/server/note.types";
import { createRequestConfig } from "../fetch/create-request-config";
import { makeAuthorizedUrl } from "../fetch/make-authorized-url";

async function postNote({ note, tagIds }: NoteInput) {
	const url = makeAuthorizedUrl("/data/note");
	return (await fetch(url, createRequestConfig.post({ note, tagIds }))).json();
}

export function useNewNoteMutation() {
	return useMutation<NoteWithIds, unknown, NoteInput>({
		async mutationFn({ note, tagIds }) {
			return postNote({ note, tagIds });
		},
		mutationKey: ["new-note"],
	});
}
