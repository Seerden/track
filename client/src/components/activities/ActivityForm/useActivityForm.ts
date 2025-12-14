import { useTagSelection } from "@lib/state/selected-tags-state";
import {
	newActivityInputSchema,
	type PossiblySyntheticActivity,
} from "@shared/lib/schemas/activity";
import type { Datelike } from "@shared/lib/schemas/timestamp";
import { useAtomValue } from "jotai";
import {
	type ChangeEvent,
	type FormEvent,
	type MouseEvent,
	useEffect,
	useState,
} from "react";
import { useActivityFormRecurrence } from "@/components/activities/ActivityForm/useActivityFormRecurrence";
import { TAG_SELECTOR_IDS } from "@/components/tags/TagSelector/constants";
import type { ModalId } from "@/lib/modal-ids";
import { timeWindowAtom } from "@/lib/state/time-window.state";
import type { ActivityState } from "./activity-state.types";
import {
	createDefaultActivity,
	createDefaultInlineActivity,
} from "./create-default-activity";
import { useSubmitNewActivity, useSubmitUpdatedActivity } from "./useSubmit";

type UseActivityFormArgs =
	| {
			initialIsTask?: boolean;
			inline?: never;
			modalId?: ModalId;
			activity?: PossiblySyntheticActivity;
			date?: never;
			timelineRowIndex?: never;
	  }
	| {
			initialIsTask?: boolean;
			inline: true;
			modalId?: never;
			activity?: never;
			date: Datelike;
			timelineRowIndex: number;
	  };

export default function useActivityForm({
	initialIsTask = false,
	inline,
	modalId,
	activity: existingActivity,
	date,
	timelineRowIndex,
}: UseActivityFormArgs) {
	const timeWindow = useAtomValue(timeWindowAtom);
	const isEditing = !!existingActivity;
	const title = existingActivity ? "Edit activity" : "Create an activity";
	const buttonTitle = existingActivity ? "Update activity" : "Create activity";

	const { resetTagSelection, setTagSelectionFromList } = useTagSelection(
		TAG_SELECTOR_IDS.DEFAULT
	);

	const [activity, setActivity] = useState<ActivityState>(() => {
		if (existingActivity) {
			return existingActivity;
		}
		const defaultActivity = createDefaultActivity({
			is_task: initialIsTask,
			timeWindow,
		});

		return inline
			? createDefaultInlineActivity({
					activity: defaultActivity,
					timelineRowIndex,
					date,
				})
			: defaultActivity;
	});
	const isValidActivity = newActivityInputSchema.safeParse(activity).success;

	const {
		recurrence,
		isRecurring,
		toggleRecurring,
		updateRecurrence,
		setRecurrenceSelection,
		resetRecurrenceSelection,
		validRecurrence,
		intervalUnitSuffix,
	} = useActivityFormRecurrence();

	const { handleSubmit: handleSubmitUpdateActivity } = useSubmitUpdatedActivity(
		{
			activity,
			modalId,
		}
	);
	const { handleSubmit: handleSubmitCreateActivity } = useSubmitNewActivity({
		activity,
		modalId,
		recurrence,
		isRecurring,
	});

	useEffect(() => {
		isEditing
			? setTagSelectionFromList(existingActivity.tag_ids)
			: resetTagSelection();
	}, []);

	function handleSubmit(
		e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
	) {
		e.preventDefault();

		return isEditing
			? handleSubmitUpdateActivity()
			: handleSubmitCreateActivity();
	}

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { type, name, value } = e.target;

		// TODO: I would like to use immer here, but it requires validation on
		// `name`.
		setActivity((current) => ({
			...current,
			[name]: type === "checkbox" ? !current.is_task : value,
		}));
	}

	const [isSequence, setIsSequence] = useState(false);
	function handleIsSequenceChange(e: ChangeEvent<HTMLInputElement>) {
		setIsSequence(e.target.checked);
	}

	return {
		handleSubmit,
		handleInputChange,
		activity,
		setActivity,
		isTask: !!activity.is_task,
		title,
		buttonTitle,
		isRecurring,
		recurrence,
		intervalUnitSuffix,
		toggleRecurring,
		updateRecurrence,
		setSelection: setRecurrenceSelection,
		resetSelection: resetRecurrenceSelection,
		isValidActivity,
		validRecurrence,
		isSequence,
		handleIsSequenceChange,
	};
}
