import { createPostConfig } from "@lib/fetch/create-post-config";
import { makeAuthorizedUrl } from "@lib/fetch/make-authorized-url";
import { useMutation } from "@tanstack/react-query";
import type { TagInput, TagWithIds } from "@type/server/tag.types";

async function postTag({ newTag, parent_id }: TagInput) {
	const url = makeAuthorizedUrl("/data/tag");

	return (await fetch(url, createPostConfig({ newTag, parent_id }))).json();
}

export function useNewTagMutation() {
	return useMutation<TagWithIds, unknown, TagInput>({
		async mutationFn({ newTag, parent_id }) {
			return postTag({ newTag, parent_id });
		},
		mutationKey: ["new-tag"],
	});
}
