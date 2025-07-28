import type { DateTimeStateSetter } from "@/components/activities/ActivityForm/datetime-picker.types";
import type { ModalId } from "@/lib/modal-ids";
import { useTagSelection } from "@lib/state/selected-tags-state";
import {
	type ActivityWithIds,
	type NewActivityInput,
	type NewRecurrenceInput,
	type PossiblySyntheticActivity,
	type WithDates,
	type WithTimestamps
} from "@shared/lib/schemas/activity";
import type {
	DayOfWeek,
	IntervalUnit,
	OmitStrict
} from "@shared/types/data/utility.types";
import { produce } from "immer";
import { useEffect, useState } from "react";
import { defaultRecurrence, FREQUENCY, INTERVAL_UNIT } from "./RecurrenceForm/constants";
import { useSubmitNewActivity, useSubmitUpdatedActivity } from "./useSubmit";

function createDefaultActivity({ is_task = false }: { is_task?: boolean }) {
	// TODO: this should not be Partial, but the full type. We can't do that
	// until TRK-83 is implemented.
	// ^ TODO (TRK-204): to implement the above TODO, we should use
	// z.input<typeof newActivitySchema>. It would require removing the user_id
	// property from here, then adding it in the submit hook or on the server.
	return {
		name: "",
		description: "",
		is_task,
		occurrence: null,
		recurrence_id: null,
		duration_milliseconds: null,
		will_recur: false
	} satisfies OmitStrict<
		NewActivityInput,
		"started_at" | "ended_at" | "start_date" | "end_date"
	>;
}

export type ActivityState = NewActivityInput | Partial<ActivityWithIds>;

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
	activity: existingActivity
}: {
	initialIsTask?: boolean;
	modalId?: ModalId;
	activity?: PossiblySyntheticActivity;
}) {
	const isEditing = !!existingActivity;
	const title = existingActivity ? "Edit activity" : "Create an activity";
	const buttonTitle = existingActivity ? "Update activity" : "Create activity";
	const defaultDateTimeValues = existingActivity
		? ({
				started_at: existingActivity.started_at,
				ended_at: existingActivity.ended_at,
				start_date: existingActivity.start_date,
				end_date: existingActivity.end_date
			} as WithDates | WithTimestamps)
		: undefined;

	const { resetTagSelection, setTagSelectionFromList } = useTagSelection();
	const [isRecurring, setIsRecurring] = useState(false);
	const [activity, setActivity] = useState<ActivityState>(
		existingActivity ?? createDefaultActivity({ is_task: initialIsTask })
	);
	const [recurrence, setRecurrence] = useState<NewRecurrenceInput>(defaultRecurrence);
	const intervalUnitSuffix = recurrence.interval > 1 ? "s" : "";
	const validRecurrence =
		recurrence.frequency === FREQUENCY.NUMERIC ||
		(recurrence.frequency === FREQUENCY.CALENDAR &&
			Boolean(recurrence.monthdays?.length || !!recurrence.weekdays?.length));

	const { handleSubmit: handleUpdateActivitySubmit } = useSubmitUpdatedActivity({
		activity,
		modalId
	});
	const { handleSubmit: handleCreateActivitySubmit } = useSubmitNewActivity({
		activity,
		modalId,
		recurrence,
		isRecurring
	});

	useEffect(() => {
		if (!isEditing) resetTagSelection();
		else setTagSelectionFromList(existingActivity.tag_ids);
	}, []);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		return isEditing ? handleUpdateActivitySubmit() : handleCreateActivitySubmit();
	}

	function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { type, name, value } = e.target;

		// TODO: I would like to use immer here, but it requires validation on
		// `name`.
		setActivity((current) => ({
			...current,
			[name]: type === "checkbox" ? !current.is_task : value
		}));
	}

	const onDateTimeChange: DateTimeStateSetter = ({ name, value }) => {
		setActivity(
			produce((draft) => {
				draft[name] = value;
			})
		);
	};

	function resetRecurrenceSelection() {
		setRecurrence(
			produce((draft) => {
				draft.weekdays = null;
				draft.monthdays = null;
			})
		);
	}

	function setRecurrenceSelection<T extends SetRecurrenceSelection["type"]>(type: T) {
		return (value: Extract<SetRecurrenceSelection, { type: T }>["value"] | null) =>
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
		onInputChange,
		onDateTimeChange,
		isTask: !!activity.is_task,
		title,
		buttonTitle,
		defaultDateTimeValues,
		isRecurring,
		recurrence,
		intervalUnitSuffix,
		toggleRecurring,
		updateRecurrence,
		setSelection: setRecurrenceSelection,
		resetSelection: resetRecurrenceSelection,
		validRecurrence
	};
}
