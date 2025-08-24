import useAuthentication from "@lib/hooks/useAuthentication";
import { queryClient } from "@lib/query-client";
import { useTagSelection } from "@lib/state/selected-tags-state";
import type { NewTag } from "@shared/lib/schemas/tag";
import { useEffect, useState } from "react";
import { useMutateNewTag } from "@/lib/hooks/query/tags/useMutateNewTag";
import { useQueryTags } from "@/lib/hooks/query/tags/useQueryTags";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import { trpc } from "@/lib/trpc";

export default function useNewTag({
	tagSelectorId,
}: {
	tagSelectorId: string;
}) {
	const { currentUser } = useAuthentication();
	const { data: tags } = useQueryTags();
	const { mutate: submit } = useMutateNewTag();

	const [newTag, setNewTag] = useState<NewTag>({
		name: "",
		// TODO: remove userId here nad handle it server-side
		// biome-ignore lint/style/noNonNullAssertion: ^
		user_id: currentUser!.user_id,
	});

	const { selectedTagIds, resetTagSelection } = useTagSelection(tagSelectorId);

	useEffect(() => {
		console.log({
			selectedTagIds,
			tagSelectorId,
		});
	}, [selectedTagIds, tagSelectorId]);
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
				},
			}
		);
	}

	return {
		onInputChange,
		onSubmit,
		tags,
	};
}
