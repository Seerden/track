import useTagsQuery from "@/lib/query/useTagsQuery";
import useAuthentication from "@/lib/useAuthentication";
import { queryClient } from "@lib/query-client";
import { useTagSelection } from "@lib/state/selected-tags-state";
import type { NewTag } from "@type/server/tag.types";
import { useEffect, useState } from "react";
import { useNewTagMutation } from "./useNewTagMutation";

export default function useNewTag() {
	const { currentUser } = useAuthentication();
	const { data: tags } = useTagsQuery();
	const { mutate: submit } = useNewTagMutation();

	const [newTag, setNewTag] = useState<NewTag>({
		name: "",
		user_id: currentUser!.user_id // TODO: find a way to refine this typing so that currentUser cannot be undefined here
	});

	const { selectedTagIds, resetTagSelection } = useTagSelection();
	const parent_id = selectedTagIds.length === 1 ? selectedTagIds[0] : undefined;

	useEffect(() => {
		// make sure we reset tag selection on mount so that we don't accidentally
		// get an already-active selection into this new tag's state.
		// TODO: we probably still want to separate tag selection states between
		// components/use-cases as described in a comment elsewhere
		resetTagSelection();
	}, []);

	function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setNewTag((current) => ({ ...current, [e.target.name]: e.target.value }));
	}

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		e.stopPropagation();

		submit(
			{ newTag, parent_id },
			{
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ["tags"] });
					// TODO: redirect
					// TODO: invalidate or refetch tags query, maybe also optimistically
					// update the tags query with the new tag already
				}
			}
		);
	}

	return {
		onInputChange,
		onSubmit,
		tags
	};
}