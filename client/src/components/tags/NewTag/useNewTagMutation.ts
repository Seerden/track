import { createRequestConfig } from "@/lib/fetch/create-request-config";
import { queryClient } from "@/lib/query-client";
import { mk, qk } from "@/lib/query-keys";
import { makeAuthorizedUrl } from "@lib/fetch/make-authorized-url";
import type { TagInput, TagWithIds } from "@t/data/tag.types";
import { useMutation } from "@tanstack/react-query";

// TODO: move this to @lib/hooks/query

async function postTag({ newTag, parent_id }: TagInput) {
	const url = makeAuthorizedUrl("/data/tag");

	return (await fetch(url, createRequestConfig.post({ newTag, parent_id }))).json();
}

export function useNewTagMutation() {
	return useMutation<TagWithIds, unknown, TagInput>({
		async mutationFn({ newTag, parent_id }) {
			return postTag({ newTag, parent_id });
		},
		mutationKey: mk.tags.new,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: qk.tags.all
			});
		}
	});
}
