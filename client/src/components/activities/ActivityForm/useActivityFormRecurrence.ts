import { type NewRecurrenceInput } from "@shared/lib/schemas/activity";
import type { DayOfWeek, IntervalUnit } from "@shared/types/data/utility.types";
import { produce } from "immer";
import { useState } from "react";
import {
	defaultRecurrence,
	FREQUENCY,
	INTERVAL_UNIT,
} from "./RecurrenceForm/constants";

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

/** This hook contains all recurrence-related functionality for useActivityForm. */
export function useActivityFormRecurrence() {
	const [isRecurring, setIsRecurring] = useState(false);
	const [recurrence, setRecurrence] =
		useState<NewRecurrenceInput>(defaultRecurrence);

	// TODO: this should just be a validation using one of the recurrence schemas, no?
	const validRecurrence =
		recurrence.frequency === FREQUENCY.NUMERIC ||
		(recurrence.frequency === FREQUENCY.CALENDAR &&
			Boolean(recurrence.monthdays?.length || !!recurrence.weekdays?.length));

	const intervalUnitSuffix = recurrence.interval > 1 ? "s" : "";

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
		recurrence,
		isRecurring,
		toggleRecurring,
		updateRecurrence,
		setRecurrenceSelection,
		resetRecurrenceSelection,
		validRecurrence,
		intervalUnitSuffix,
	};
}
