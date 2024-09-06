import { useMutation } from "@tanstack/react-query";
import { baseUrl, postConfig } from "../../lib/fetch/fetch-constants";
import { NewTag, TagWithIds } from "../../types/server/tag.types";
import { ID } from "../../types/server/utility.types";

type TagInput = {
	newTag: NewTag;
	parent_id?: ID;
};

async function postTag({ newTag, parent_id }: TagInput) {
	return (
		await fetch(`${baseUrl}/data/tag`, {
			...postConfig,
			body: JSON.stringify({ newTag, parent_id }),
		})
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
