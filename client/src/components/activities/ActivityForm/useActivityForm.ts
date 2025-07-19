import type { DateTimeStateSetter } from "@/components/activities/ActivityForm/datetime-picker.types";
import type { ModalId } from "@/lib/modal-ids";
import useAuthentication from "@lib/hooks/useAuthentication";
import { useTagSelection } from "@lib/state/selected-tags-state";
import {
	type ActivityWithIds,
	type NewActivity,
	type NewRecurrenceInput,
	type WithDates,
	type WithTimestamps
} from "@shared/lib/schemas/activity";
import type { DayOfWeek, IntervalUnit } from "@shared/types/data/utility.types";
import { produce } from "immer";
import { useEffect, useMemo, useState } from "react";
import { defaultRecurrence, FREQUENCY, INTERVAL_UNIT } from "./RecurrenceForm/constants";
import { useSubmitNewActivity, useSubmitUpdatedActivity } from "./useSubmit";

type UseActivityFormArgs = {
	initialIsTask?: boolean;
	modalId?: ModalId;
	activity?: ActivityWithIds;
};

type ActivityState = Partial<NewActivity> | Partial<ActivityWithIds>;

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
}: UseActivityFormArgs) {
	const { currentUser } = useAuthentication();
	const { resetTagSelection, setTagSelectionFromList } = useTagSelection();

	const isEditing = !!existingActivity;

	// TODO: this should not be Partial, but the full type. We can't do that
	// until TRK-83 is implemented.
	const defaultNewActivity: Partial<NewActivity> = {
		name: "",
		description: "",
		user_id: currentUser?.user_id,
		is_task: initialIsTask,
		occurrence: null,
		recurrence_id: null
	};

	const [activity, setActivity] = useState<ActivityState>(
		existingActivity ?? defaultNewActivity
	);
	const [recurrence, setRecurrence] = useState<NewRecurrenceInput>(defaultRecurrence);

	const { onSubmit: handleSubmit } = useSubmitNewActivity({
		activity,
		modalId,
		recurrence
	});
	const { onSubmit: onUpdateSubmit } = useSubmitUpdatedActivity(activity, modalId);

	// TODO: the two useSubmit hooks have identical onSuccess callbacks. Maybe we
	// should define it in here, and pass it to the hooks as an argument.
	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		return isEditing ? onUpdateSubmit(e) : handleSubmit(e);
	}

	useEffect(() => {
		if (!isEditing) resetTagSelection();
		else setTagSelectionFromList(existingActivity.tag_ids);
	}, []);

	function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { type, name, value } = e.target;

		setActivity((current) => ({
			...current,
			[name]: type === "checkbox" ? !current.is_task : value
		}));
	}

	const onDateTimeChange: DateTimeStateSetter = ({ name, value }) => {
		setActivity((current) => ({
			...current,
			[name]: value
		}));
	};

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

	// stuff that was previously in useRecurrenceForm

	const [isRecurring, setIsRecurring] = useState(false);

	// TODO (TRK-204): remove this
	useEffect(() => {
		console.log({ recurrence });
	}, [recurrence]);

	function resetSelection() {
		setRecurrence(
			produce((draft) => {
				draft.weekdays = null;
				draft.monthdays = null;
			})
		);
	}

	function setSelection<T extends SetRecurrenceSelection["type"]>(type: T) {
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
				return resetSelection(); // for all these cases, we return the final statement so we don't have to call break manually
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
				return resetSelection();
			case "interval":
				return setRecurrence(
					produce((draft) => {
						draft.interval = value;
					})
				);
		}
	}

	const intervalUnitSuffix = recurrence.interval > 1 ? "s" : "";

	// TODO TRK-204: before submitting, check if the recurrence makes sense. A
	// calendar (fixed date) recurrence needs at least 1 weekday or monthday, and
	// a numeric (interval) recurrence needs a valid interval.

	const validRecurrence = useMemo(() => {
		return (
			recurrence.frequency === FREQUENCY.NUMERIC ||
			(recurrence.frequency === FREQUENCY.CALENDAR &&
				Boolean(recurrence.monthdays?.length || !!recurrence.weekdays?.length))
		);
	}, [recurrence]);

	return {
		onSubmit,
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
		setSelection,
		resetSelection,
		validRecurrence
	};
}
