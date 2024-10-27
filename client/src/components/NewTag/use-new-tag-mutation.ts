import { createRequestConfig } from "@/lib/fetch/create-request-config";
import { queryClient } from "@/lib/query-client";
import { makeAuthorizedUrl } from "@lib/fetch/make-authorized-url";
import { useMutation } from "@tanstack/react-query";
import type { TagInput, TagWithIds } from "@type/server/tag.types";

async function postTag({ newTag, parent_id }: TagInput) {
	const url = makeAuthorizedUrl("/data/tag");

	return (await fetch(url, createRequestConfig.post({ newTag, parent_id }))).json();
}

export function useNewTagMutation() {
	return useMutation<TagWithIds, unknown, TagInput>({
		async mutationFn({ newTag, parent_id }) {
			return postTag({ newTag, parent_id });
		},
		mutationKey: ["new-tag"],
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["tags"],
			});
		},
	});
}
