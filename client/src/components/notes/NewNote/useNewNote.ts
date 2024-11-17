import { useNewNoteMutation } from "@/lib/hooks/query/notes/useNewNoteMutation";
import useTagsQuery from "@/lib/hooks/query/tags/useTagsQuery";
import useAuthentication from "@lib/hooks/useAuthentication";
import useRouteProps from "@lib/hooks/useRouteProps";
import { queryClient } from "@lib/query-client";
import { useTagSelection } from "@lib/state/selected-tags-state";
import type { NewNote } from "@type/server/note.types";
import { useEffect, useState } from "react";

export default function useNewNote() {
	const { data: tagsData } = useTagsQuery();
	const { navigate } = useRouteProps();
	const { currentUser } = useAuthentication();
	const { mutate } = useNewNoteMutation();
	const { selectedTagIds, resetTagSelection } = useTagSelection();
	const [note, setNote] = useState<Partial<NewNote>>({
		content: "",
		user_id: currentUser?.user_id
	});

	useEffect(() => {
		// On mount, clear selectedTags state
		// TODO: see #64, tagSelection should be an atomFamily so we can target
		// specific uses of it.
		resetTagSelection();

		// TODO: if `inActivity`, we take the activity_id from the
		// 'active'/in-focus/selected activity. This is not yet implemented.
		// if (inActivity) {
		//    setNote((current) => ({
		//       ...current,
		//       activity_id: selectedActivity.activity_id
		//    }));
		// }
	}, []);

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		// TODO: there should be a better way to do this than typing note as
		// Partial<NewNote> and checking user_id here. Maybe early-escape from the
		// whole hook if there is no user_id.
		// ^ TODO: write a type guard for notes, use that here
		if (note.user_id) {
			mutate(
				{ note: note as NewNote, tagIds: selectedTagIds },
				{
					onSuccess: () => {
						// TODO: redirect, or close the modal.

						queryClient.invalidateQueries({ queryKey: ["notes"] });
						navigate("/notes");

						// TODO: also optimistically populate the UI with the newly
						// created note if possible. depends on from which
						// page/context this hook/component is called though
					}
				}
			);
		}
	}

	/** Input change handler for `title` and `content` fields. */
	function onInputChange(
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		setNote((current) => ({
			...current,
			[event.target.name]: event.target.value
		}));
	}

	return {
		note,
		onInputChange,
		onSubmit,
		tagsData
	};
}
