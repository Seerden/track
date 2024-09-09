import { useState } from "react";
import { useSelectedTags } from "../../lib/state/selected-tags-state";
import useAuthentication from "../../lib/use-authentication";
import type { NewTag } from "../../types/server/tag.types";
import { useNewTagMutation } from "./use-new-tag-mutation";

export default function useNewTag() {
	const { currentUser } = useAuthentication();

	const { mutate: submit } = useNewTagMutation();

	const [newTag, setNewTag] = useState<NewTag>({
		name: "",
		user_id: currentUser!.user_id, // TODO: find a way to refine this typing so that currentUser cannot be undefined here
	});

	const { selectedTagIds } = useSelectedTags();
	const parent_id = selectedTagIds.length === 1 ? selectedTagIds[0] : undefined;

	function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setNewTag((current) => ({ ...current, [e.target.name]: e.target.value }));
	}

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		submit(
			{ newTag, parent_id },
			{
				onSuccess: () => {
					// TODO: redirect
					// TODO: invalidate or refetch tags query, maybe also optimistically
					// update the tags query with the new tag already
				},
			},
		);
	}

	return {
		onInputChange,
		onSubmit,
	};
}
