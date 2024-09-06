import { useMutation } from "@tanstack/react-query";
import { createPostConfig } from "../../lib/fetch/create-post-config";
import { baseUrl } from "../../lib/fetch/fetch-constants";
import { NewTag, TagWithIds } from "../../types/server/tag.types";
import { ID } from "../../types/server/utility.types";

type TagInput = {
	newTag: NewTag;
	parent_id?: ID;
};

async function postTag({ newTag, parent_id }: TagInput) {
	return (
		await fetch(`${baseUrl}/data/tag`, createPostConfig({ newTag, parent_id }))
	).json();
}

export function useNewTagMutation() {
	return useMutation<TagWithIds, unknown, TagInput>({
		async mutationFn({ newTag, parent_id }) {
			return postTag({ newTag, parent_id });
		},
		mutationKey: ["new-tag"],
	});
}
