import { createRequestConfig } from "@/lib/fetch/create-request-config";
import { queryClient } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";
import { makeAuthorizedUrl } from "@lib/fetch/make-authorized-url";
import type { TagInput } from "@shared/types/data/tag.types";
import { useMutation } from "@tanstack/react-query";

// TODO: move this to @lib/hooks/query

async function postTag({ newTag, parent_id }: TagInput) {
	const url = makeAuthorizedUrl("/data/tag");

	return (await fetch(url, createRequestConfig.post({ newTag, parent_id }))).json();
}

export function useNewTagMutation() {
	return useMutation(
		trpc.tags.create.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: trpc.tags.all.queryKey()
				});
			}
		})
	);
}
