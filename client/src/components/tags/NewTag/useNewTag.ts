import { useMutateNewTag } from "@/lib/hooks/query/tags/useMutateNewTag";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import { trpc } from "@/lib/trpc";
import useAuthentication from "@lib/hooks/useAuthentication";
import { queryClient } from "@lib/query-client";
import { useTagSelection } from "@lib/state/selected-tags-state";
import type { NewTag } from "@shared/lib/schemas/tag";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function useNewTag() {
	const { currentUser } = useAuthentication();
	const { data: tagsData } = useQuery(trpc.tags.all.queryOptions());
	const { mutate: submit } = useMutateNewTag();

	const [newTag, setNewTag] = useState<NewTag>({
		name: "",
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		user_id: currentUser!.user_id // TODO: find a way to refine this typing so that currentUser cannot be undefined here
	});

	const { selectedTagIds, resetTagSelection } = useTagSelection();
	const parent_id = selectedTagIds.length === 1 ? selectedTagIds[0] : undefined;
	const { closeModal } = useModalState();

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

	function onSubmit(e: React.FormEvent<HTMLButtonElement>) {
		e.preventDefault();
		e.stopPropagation();

		submit(
			{ newTag, parent_id },
			{
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: trpc.tags.all.queryKey() });
					closeModal(modalIds.tagSelector.activityForm);
				}
			}
		);
	}

	return {
		onInputChange,
		onSubmit,
		tagsData
	};
}
