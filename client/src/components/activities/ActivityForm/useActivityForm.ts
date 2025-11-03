import { useTagSelection } from "@lib/state/selected-tags-state";
import {
	type NewRecurrenceInput,
	newActivityInputSchema,
	type PossiblySyntheticActivity,
} from "@shared/lib/schemas/activity";
import type { DayOfWeek, IntervalUnit } from "@shared/types/data/utility.types";
import { produce } from "immer";
import { useEffect, useState } from "react";
import { TAG_SELECTOR_IDS } from "@/components/tags/TagSelector/constants";
import type { ModalId } from "@/lib/modal-ids";
import type { ActivityState } from "./activity-state.types";
import { createDefaultActivity } from "./create-default-activity";
import {
	defaultRecurrence,
	FREQUENCY,
	INTERVAL_UNIT,
} from "./RecurrenceForm/constants";
import { useSubmitNewActivity, useSubmitUpdatedActivity } from "./useSubmit";

type UpdateRecurrencePayload =
	| {
			type: "intervalUnit";
			value: IntervalUnit;
	  }
	| {
			type: "frequency";
			value: `${FREQUENCY}`;
	  }
	| {
			type: "interval";
			value: number;
	  };

type SetRecurrenceSelection =
	| { type: "weekdays"; value: DayOfWeek }
	| { type: "monthdays"; value: number };

export default function useActivityForm({
	initialIsTask = false,
	modalId,
	activity: existingActivity,
}: {
	initialIsTask?: boolean;
	modalId?: ModalId;
	activity?: PossiblySyntheticActivity;
}) {
	const isEditing = !!existingActivity;
	const title = existingActivity ? "Edit activity" : "Create an activity";
	const buttonTitle = existingActivity ? "Update activity" : "Create activity";

	const { resetTagSelection, setTagSelectionFromList } = useTagSelection(
		TAG_SELECTOR_IDS.DEFAULT
	);
	const [isRecurring, setIsRecurring] = useState(false);
	const [activity, setActivity] = useState<ActivityState>(
		existingActivity ?? createDefaultActivity({ is_task: initialIsTask })
	);
	const validActivity = newActivityInputSchema.safeParse(activity).success;
	const [recurrence, setRecurrence] =
		useState<NewRecurrenceInput>(defaultRecurrence);
	const intervalUnitSuffix = recurrence.interval > 1 ? "s" : "";
	// TODO: this should just be a validation using one of the recurrence schemas, no?
	const validRecurrence =
		recurrence.frequency === FREQUENCY.NUMERIC ||
		(recurrence.frequency === FREQUENCY.CALENDAR &&
			Boolean(recurrence.monthdays?.length || !!recurrence.weekdays?.length));

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

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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

	function resetRecurrenceSelection() {
		setRecurrence(
			produce((draft) => {
				draft.weekdays = null;
				draft.monthdays = null;
			})
		);
	}

	function setRecurrenceSelection<T extends SetRecurrenceSelection["type"]>(
		type: T
	) {
		return (
			value: Extract<SetRecurrenceSelection, { type: T }>["value"] | null
		) =>
			setRecurrence(
				produce((draft) => {
					// The logic for these cases is basically the same, but the
					// typing is different, so it's easier to write it out twice.
					if (type === "weekdays") {
						const v = value as DayOfWeek;
						draft.monthdays = null;

						draft.weekdays ??= [];
						if (draft.weekdays.includes(v)) {
							draft.weekdays.splice(draft.weekdays.indexOf(v), 1);
						} else {
							draft.weekdays.push(v);
						}
					} else {
						const v = value as number;
						draft.monthdays ??= [];

						if (draft.monthdays.includes(v)) {
							draft.monthdays.splice(draft.monthdays.indexOf(v), 1);
						} else {
							draft.monthdays.push(v);
						}

						draft.weekdays = null;
					}
				})
			);
	}

	function toggleRecurring() {
		setIsRecurring((current) => !current);
	}

	function updateRecurrence({ type, value }: UpdateRecurrencePayload) {
		switch (type) {
			case "intervalUnit":
				setRecurrence(
					produce((draft) => {
						draft.interval_unit = value;
					})
				);
				// for all these cases, we return the final statement so we don't
				// have to call break manually
				return resetRecurrenceSelection();
			case "frequency":
				setRecurrence(
					produce((draft) => {
						draft.interval = 1;

						draft.interval_unit =
							draft.interval_unit === INTERVAL_UNIT.DAY
								? INTERVAL_UNIT.WEEK
								: INTERVAL_UNIT.DAY;

						draft.frequency = value;
					})
				);
				return resetRecurrenceSelection();
			case "interval":
				return setRecurrence(
					produce((draft) => {
						draft.interval = value;
					})
				);
		}
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
		validActivity,
		validRecurrence,
	};
}
