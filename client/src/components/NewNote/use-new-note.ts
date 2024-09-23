import { useEffect, useState } from "react";
import { queryClient } from "../../lib/query-client";
import { useTagSelection } from "../../lib/state/selected-tags-state";
import useAuthentication from "../../lib/use-authentication";
import { useNewNoteMutation } from "../../lib/use-new-note-mutation";
import { NewNote } from "../../types/server/note.types";

type UseNewNoteProps = {
	inActivity?: boolean;
};

export default function useNewNote({ inActivity }: UseNewNoteProps = {}) {
	const { currentUser } = useAuthentication();
	const { mutate } = useNewNoteMutation();
	const { selectedTagIds, resetTagSelection } = useTagSelection();
	const [note, setNote] = useState<Partial<NewNote>>({
		content: "",
		user_id: currentUser?.user_id,
	});

	useEffect(() => {
		// On mount, clear selectedTags state
		// TODO: selectedTags state should be separate for this component; maybe add
		// an id to the state key -- or make it like an atomFamily or something,
		// idk yet
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
		if (note.user_id) {
			mutate(
				{ note: note as NewNote, tagIds: selectedTagIds },
				{
					onSuccess: () => {
						// TODO: redirect, or close the modal.

						queryClient.invalidateQueries({ queryKey: ["notes"] });

						// TODO: also optimistically populate the UI with the newly
						// created note if possible. depends on from which
						// page/context this hook/component is called though
					},
				},
			);
		}
	}

	/** Input change handler for `title` and `content` fields. */
	function onInputChange(
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) {
		setNote((current) => ({
			...current,
			[event.target.name]: event.target.value,
		}));
	}

	return {
		note,
		onInputChange,
		onSubmit,
	};
}
